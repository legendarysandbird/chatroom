const http = require('http');
const fs = require('fs');

const hostname = '10.0.0.100';
const port = 8000;


http.createServer((req, res) => {
	res.statusCode = 200;
	res.setHeader('Content-Type', 'text/html');
	let url = req.url
	if (url == '/') url += 'index.html'
	if (url == '/style.css') {
		res.setHeader('Content-Type', 'text/css');
	}
	fs.readFile('./' + url, function (err, html) {
		if (err) {
			res.write('404')
			res.end();
			return
		}
		res.write(html)
		res.end();
	});
}).listen(port);

console.log(`Server running at http://${hostname}:${port}/`);


