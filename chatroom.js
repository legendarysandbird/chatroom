const http = require('http');
const fs = require('fs');

const hostname = '10.0.0.100';
const port = 8000;

fs.readFile('./index.html', function (err, html) {
	if (err) throw err;

	http.createServer((req, res) => {
		res.statusCode = 200;
		res.setHeader('Content-Type', 'text/html');
		res.write(html)
		res.end();
	}).listen(port);

	console.log(`Server running at http://${hostname}:${port}/`);
});


