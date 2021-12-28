const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
   username: {
	  type: String,
	  default: ""
   },
   email: {
	  type: String,
	  require: true
   },
   password: {
	  type: String,
	  require: true
   },
   joinedDate: {
	  type: Date,
	  default: Date.now
   },
   bio: {
	  type: String,
	  default: ""
   },
   picture: {
	  type: String,
	  default: ""
   },
   type: {
	  type: String,
	  default: "USER"
   }
}, { timestamps: true })

const User = mongoose.model("User", userSchema)

module.exports = User;