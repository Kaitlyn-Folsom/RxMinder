const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs')
mongoose.promise = Promise

// Define userSchema
const userSchema = new Schema({
	local: {
		email: { 
			type: String, 
			unique: true, 
			required: true,
			match: [/.+\@.+\..+/, "Please enter a valid e-mail address"] 
		},
		password: { 
			type: String,
			trim: true, 
			unique: false, 
			required: true,
			validate: [
				function(input) {
					return input.length >= 6;
				},
				"Password must be longer than 6 characters."
			]
		}
	},
	firstName: {
		type: String,
		unique: false,
		required: true
	},
	lastName: {
		type: String,
		unique: false,
		required: true
	},
  phone: {
    type: String,
    unique: true,
    required: true
  },
	patients: [
    {
    type: Schema.Types.ObjectId,
    ref: "Patient"
    }
  ]
})

// Define schema methods
userSchema.methods = {
	checkPassword: function(inputPassword) {
		return bcrypt.compareSync(inputPassword, this.local.password)
	},
	hashPassword: plainTextPassword => {
		return bcrypt.hashSync(plainTextPassword, 10)
	}
}

// Define hooks for pre-saving
userSchema.pre('save', function(next) {
	if (!this.local.password) {
		console.log('=======NO PASSWORD PROVIDED=======')
		next()
	} else {
		this.local.password = this.hashPassword(this.local.password)
		next()
	}
})

// Create reference to User & export
const User = mongoose.model('User', userSchema)
module.exports = User