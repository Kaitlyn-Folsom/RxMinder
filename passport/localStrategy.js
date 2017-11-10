
const User = require('../db/models/User')
const LocalStrategy = require('passport-local').Strategy

const strategy = new LocalStrategy(
	{
		usernameField: 'email', // not necessary, DEFAULT
	},
	function(email, password, done) {
		User.findOne({ 'local.email': email }, (err, userMatch) => {
			if (err) {
				return done(err)
			}
			if(userMatch) {

			}
			if (!userMatch) {
				return done(null, false, { message: 'Incorrect email' })
			}
			if (!userMatch.checkPassword(password)) {
				return done(null, false, { message: 'Incorrect password' })
			}
			return done(null, userMatch)
		})
	}
)

module.exports = strategy;

