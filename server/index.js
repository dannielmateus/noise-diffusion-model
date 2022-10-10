const https = require('https');
const fs = require('fs');
const cors = require('cors');
const path = require('path');
const util = require('./util.js');
const express = require('express');

const app = express();
const PORT = 5001;

const options = {
	key: fs.readFileSync('key.pem'),
	cert: fs.readFileSync('cert.pem')
};

app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');

	util.log("req.baseUrl:", req.baseUrl, "req.path:", req.path);
	process.nextTick(next);
});
app.use(cors());

const files_path = path.resolve('../static');
console.log("serving files from ", files_path);
app.use( express.static( files_path, { maxAge: 5*1000 } ) );

https.createServer(options, app).listen(PORT, ()=>{
	console.log("App listening on port " + PORT);
})


/*

openssl genrsa -out key.pem
openssl req -new -key key.pem -out csr.pem
openssl x509 -req -days 9999 -in csr.pem -signkey key.pem -out cert.pem
rm csr.pem

*/


