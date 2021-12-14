const express = require('express');

const app = express();

app.get("/", (request, response) => {
	response.send("Hello world");
})

const port = 8080;

app.listen(port, () => {
	console.log("The server works just fine")
});