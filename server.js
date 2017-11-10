// Loading evnironmental variables here
if (process.env.NODE_ENV !== 'production') {
	console.log('loading dev environments')
	require('dotenv').config()
}
require('dotenv').config()

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require("path");
// var db = require("./models");
const PORT = process.env.PORT || 3001;
const twilio = require('twilio');
const moment = require('moment');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const passport = require('./passport');
const dbConnection = require('./db');
const User = require('./db/models/user')
const Patient = require('./db/models/patients')
const Reminder = require('./db/models/reminders')


//================ MIDDLEWARE ================= //
app.use(logger('dev'))
app.use(
	bodyParser.urlencoded({
		extended: false
	})
)
app.use(bodyParser.json())
app.use(
	session({
		secret: process.env.APP_SECRET || 'this is the default passphrase',
		store: new MongoStore({ mongooseConnection: dbConnection }),
		resave: false,
		saveUninitialized: false
	})
)

//================ PASSPORT ================= //
app.use(passport.initialize())
app.use(passport.session()) // will call the deserializeUser


app.use('/auth', require('./passport/auth'))

// ====== Error handler ====
app.use(function(err, req, res, next) {
	console.log('====== ERROR =======')
	console.error(err.stack)
	res.status(500)
})


//==================================Twilio=========================================

const accountSid = 'AC48ce06d27e69dece3a0702596ee55a08'; // Your Account SID from www.twilio.com/console
const authToken = 'a9d53929a8bf32774108b4644960dba8';   // Your Auth Token from www.twilio.com/console

const client = require('twilio')(accountSid, authToken);

//==================================Send Twilio Text=========================================

// client.messages.create({
//     body: 'Hello from Node',
//     to: '+19087631304',  // Text this number
//     from: '+14848123347' // Our valid Twilio number
// })
// .then((message) => console.log(message.sid));

//==================================Send Twilio Image Text=========================================

// client.messages
//   .create({
//     to: '+19087631304',
//     from: '+14848123347',
//     body: '10:00AM: Take these pills. Reply "YES" after you take them.',
//     mediaUrl: 'https://www.wareable.com/media/images/2016/03/pills-closeup-1459347869-F998-column-width-inline.jpg',
//   })
//   .then(message => console.log(message.sid));


//==================================Twilio Respond to Text=========================================

const MessagingResponse = require('twilio').twiml.MessagingResponse;


let day;
switch (new Date().getDay()) {
    case 0:
        day = "Sunday";
        break;
    case 1:
        day = "Monday";
        break;
    case 2:
        day = "Tuesday";
        break;
    case 3:
        day = "Wednesday";
        break;
    case 4:
        day = "Thursday";
        break;
    case 5:
        day = "Friday";
        break;
    case 6:
        day = "Saturday";
}

app.post('/sms', (req, res) => {
  const twiml = new MessagingResponse();

  console.log(
  	"*********************************************************  server req: ");
  console.log(req.body);
  console.log(req._startTime);

  twiml.message('Great!');

  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());

	var string =  req.body.From;
	var array = string.split("");
	array = array.slice(2);
	array = array.join("")
	console.log(array);

  Patient.find({patientPhone: array}).then(function(patients) {

		// Loop through all of the patients information in the db
		for (let i = 0; i < patients.length; i++) {
			// Get the patient's phone and all of their reminders
			let currentPatient = patients[i];
			let patientPhone = currentPatient.patientPhone;
			let remindersArray = currentPatient.reminders;

			// Loop through each of the patient's reminders and get the reminderId
			for (let j = 0; j < remindersArray.length; j++) {
				let reminderId = remindersArray[j];
				console.log(reminderId);

				var d = new Date();
				var currentMinutes = d.getMinutes();

				if (currentMinutes >= 30) {
					currentMinutes = "30";
				} else {
					currentMinutes = "00";
				}

				var currentHours = d.getHours();

				var timeDue = currentHours + ":" + currentMinutes;

			  Reminder.find({_id: reminderId, dayToComplete: {$in: [day]}, timeToComplete: timeDue }).then(function(reminders) {
			  	console.log(reminders);
			  	for (var i = 0; i < reminders.length; i++) {
			  		var updateReminderId = reminders[i];

				  Reminder.findOneAndUpdate({_id: updateReminderId}, {responseReceived: true}).then(function(completeReminder) {
					    console.log("reminder has been set to true: " + completeReminder)
					  }).catch(function(err) {
					    res.json(err);
					  })

			  	}

				})
		}
	}

})
})

//==================================Routes=========================================

// // Main "/" Route. This will redirect the user to our rendered React application
// app.get("*", function(req, res) {
//   res.sendFile(__dirname + "/build/static/index.html");
// });


// Start the server
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});


