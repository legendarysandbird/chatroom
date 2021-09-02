const express = require('express');
const ip = require("ip");
const cookieParser = require('cookie-parser');

const app = express();

const hostname = ip.address();
const port = 8000;

const emojis = {
	"fa-laugh-squint": 0,
	"fa-smile-beam": 0,
	"fa-sad-cry": 0
};

let messages = [];
let numMessages = 0;

app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

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

app.get("/username", function(req, res) {
	//console.log(req.cookies.username);
	res.send(req.cookies.username);
});

app.get('/chat', function(req, res) {
	res.send(messages);
});

app.get('/clear/name', function(req, res) {
	res.clearCookie("username");	
	res.end();
});

app.post('/', (req, res) => {
	req.body.emojis = {...emojis};
	req.body.id = numMessages;
	messages.push(req.body);
	numMessages += 1;
	res.end();
});

app.post('/login', (req, res) => {
	res.cookie("username", req.body.username);
	res.end();
});

app.post('/clear', (req, res) => {
	messages = [];
	res.end();
});

app.post('/emoji/add', (req, res) => {
	messages[req.body.id]["emojis"][req.body.emoji] += 1;
	res.end();
});

app.listen(port, () => {
	console.log(`Server running at http://${hostname}:${port}/`);
});

