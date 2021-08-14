const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const hostname = '10.0.0.100';
const port = 8000;

app.use(express.static('public'));
app.use(bodyParser());

app.get('/', function(req, res) {
	console.log(req.url);
	let url;
	if (req.url == "/") {
		url = "/index.html";
	}
	else {
		
		url = req.url;
	}
	res.sendFile(__dirname + url);
});

app.post('/', (req, res) => {
	res.send(`Data is ${req.body.message}.`)
});

app.listen(port, () => {
	console.log(`Server running at http://${hostname}:${port}/`);
});



