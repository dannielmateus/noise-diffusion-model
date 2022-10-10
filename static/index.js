const http = require('http');
const express = require('express');
const path = require('path');

const app = express();
const PORT = 5002;
const options = {};

const files_path = path.resolve('./static');
console.log("serving files from ", files_path);
app.use( express.static( files_path, { maxAge: 5*1000 } ) );

http.createServer(options, app).listen(PORT, ()=>{
	console.log("App listening on port " + PORT);
})

