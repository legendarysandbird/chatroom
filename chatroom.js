const express = require('express');
const ip = require("ip");

const app = express();

const hostname = ip.address();
const port = 8000;

let messages = [];

app.use(express.static('public'));
app.use(express.json());

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
	messages.push(`[${req.body.date}] ${req.body.name}: ${req.body.message}`);
});

app.get('/chat', function(req, res) {
	res.send(messages);
});

app.listen(port, () => {
	console.log(`Server running at http://${hostname}:${port}/`);
});

