const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const http = require('http');
const https = require('https');

var privateKey = fs.readFileSync('secure_modules/key.pem');
var certificate = fs.readFileSync('secure_modules/cert.pem');

const credentials = {key: privateKey, cert: certificate, passphrase: 'jug200712'};

const app = express();

const secureServer = https.createServer(credentials, app);

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/build'));
app.get('*', (req, res) => {
   res.sendFile(path.resolve(__dirname, 'build', 'index.html'))
})  

const port = process.env.PORT || 443;

secureServer.listen(port, () => console.log(`Server running on port ${port}`));