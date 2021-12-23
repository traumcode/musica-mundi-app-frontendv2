const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
	username: {
		type:String,
		require: true
	},
	email: {
		type:String,
		require: true
	},
	password: {
		type:String,
		require: true
	},
	joinedDate: {
		type: Date,
		default: Date.now
	},
	bio: {
		type:String,
		default:""
	}
}, {timestamps: true})

const User = mongoose.model("User", userSchema)

module.exports = User;