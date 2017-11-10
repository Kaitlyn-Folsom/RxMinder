var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

var RemindersSchema = new Schema({

  reminderTitle: {
    type: String,
    trim: true
  },

  dayToComplete: {
    type: Array
  },

  timeToComplete: {
    type: String
  },

  typeOfMedication: {
    type: String
  },

  medicationDosage: {
    type: String
  },

  medicationRefillDate: {
    type: String
  },

  reminderMessage: {
    type: String,
    required: true
  },

  reminderImage: {
    type: String
  },

  receiveResponseBy: {
    type: String
  },

  responseReceived: {
    type: Boolean,
    default: false
  },

   responseLate: {
     type: Boolean,
     default: false
   }
});

// This creates our model from the above schema, using mongoose's model method
var Reminders = mongoose.model("Reminders", RemindersSchema);

// Export the Reminder model
module.exports = Reminders;