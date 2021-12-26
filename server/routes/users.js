const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const { OAuth2Client } = require('google-auth-library');
const {google} = require('googleapis');

require('dotenv')
	.config()

const validateRegisterInput = require("../validation/register")
const validateLoginInput = require("../validation/login")

const User = require('../models/User')

const secretClient =  new OAuth2Client(process.env.NODE_GOOLE_SECRET_KEY)
router.post('/register-google', async (req, res) => {
	const { token } = req.body;

	console.log(process.env.NODE_GOOLE_SECRET_KEY)

	const ticket = await secretClient.verifyIdToken({
		idToken: token,
		audience: process.env.NODE_GOOGLE_CLIENT_ID
	})

	const {username, email} = ticket.getPayload()

	console.log(ticket)

	const newUser = await new User({
		where: {email:email},
		update: {username, email},
		create: {username, email}
	})
	res.status(201)
	res.json(newUser)
})

router.post('/register', (req, res) => {
	const {
				errors,
				isValid
			} = validateRegisterInput(req.body)
	if (!isValid) {
		return res.status(400).json(errors)
	}

	User.findOne({ username: req.body.username }).then(user => {
		if (user) {
			return res.status(400).json({ username: "User already exists" })
		} else {
			User.findOne({ email: req.body.email }).then(user => {
				if (user) {
					return res.status(400).json({ email: "Email already exists" })
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
		return res.status(400).json(errors);
	}
	const email = req.body.email;
	const password = req.body.password;

	User.findOne({ email }).then(user => {
		if (!user) {
			return res.status(404).json({ emailnotfound: "Email not found" });
		}
		bcrypt.compare(password, user.password).then(isMatch => {
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
							username:user.username
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
