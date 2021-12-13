const express = require('express');

export const  app = express();


const port = 3000;
app.listen(port, () => {
	console.log("APP IS RUNNING FINE")
});