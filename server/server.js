const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const passport = require('passport')

const users = require("./routes/users")
const app = express();


/* BODYPARSER MIDDLEWARE */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


/* DATABASE CONFIGURATION */
const _DATABASE = require('./config/keys').mongoURI;


/* CONNECT TO MONGO DB */
mongoose.connect(_DATABASE, { useNewUrlParser: true,useUnifiedTopology: true })
	.then(() => console.log("Server is running goood 🐷"))
	.catch(err => console.log(err))

/* PASSPORT MIDDLEWARE */
app.use(passport.initialize());

/* PASSPORT CONFIG */
require("./config/passport")(passport);

/* ROUTES */
app.use("/users", users)

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server up and running on port ${port} !`));