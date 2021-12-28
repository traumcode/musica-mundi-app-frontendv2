const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const { OAuth2Client } = require('google-auth-library');
const { google } = require('googleapis');

require('dotenv')
   .config()

const validateRegisterInput = require("../validation/register")
const validateLoginInput = require("../validation/login")

const User = require('../models/User')


router.post('/register', (req, res) => {
   const {
			errors,
			isValid
		 } = validateRegisterInput(req.body)

   if (!isValid) {
	  return res.status(400)
		 .json(errors)
   }
   User.findOne({ username: req.body.username })
	  .then(user => {
		 if (user) {
			return res.status(400)
			   .json({ username: "User already exists" })
		 } else {
			User.findOne({ email: req.body.email })
			   .then(user => {
				  if (user) {
					 return res.status(400)
						.json({ email: "Email already exists" })
				  } else {
					 const newUser = new User({
						username: req.body.username,
						email: req.body.email,
						password: req.body.password,
						bio: req.body.bio,
						picture: req.body.picture
					 })
					 bcrypt.genSalt(10, (err, salt) => {
						bcrypt.hash(newUser.password, salt, (err, hash) => {
						   if (err) throw err;
						   newUser.password = hash
						   newUser
							  .save()
							  .then(user => res.json(user))
							  .catch(err => console.log(err))
						})
					 })
				  }
			   })
		 }
	  })


})

router.post('/login', (req, res) => {
   const {
			errors,
			isValid
		 } = validateLoginInput(req.body);

   if (!isValid) {
	  return res.status(400)
		 .json(errors);
   }
   const email = req.body.email;
   const password = req.body.password;

   User.findOne({ email })
	  .then(user => {
		 if (!user) {
			return res.status(404)
			   .json({ emailnotfound: "Email not found" });
		 }
		 bcrypt.compare(password, user.password)
			.then(isMatch => {
			   if (isMatch) {
				  const payload = {
					 id: user.id,
					 name: user.name
				  };
				  jwt.sign(
					 payload,
					 keys.secretOrKey,
					 {
						expiresIn: 31556926 // 1 year in seconds
					 },
					 (err, token) => {
						res.json({
						   success: true,
						   token: "Bearer " + token,
						   username: user.username
						});
					 }
				  );
			   } else {
				  return res
					 .status(400)
					 .json({ passwordincorrect: "Password incorrect" });
			   }
			});
	  });
});

module.exports = router;
