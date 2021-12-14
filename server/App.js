const morgan = require('morgan');
const express = require('express');
const app = express();

const port = 8080;

//ROUTES
const { getPosts } = require('./routes/post');

//MIDDLEWARE

app.use(morgan('dev'));

app.get("/", getPosts);

app.listen(port, () => {
	console.log("The server works just fine")
});