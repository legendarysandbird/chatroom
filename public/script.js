const button = document.getElementById("button");
const history = document.getElementById("history");

function execute() {
	fetch("/chat").then(function(response) {
		response.text().then( (text) => {
			history.innerHTML = text;
		});
	}).then(function(data) {
		console.log(data);
	}).catch(function() {
		console.log("Booo");
	});

	setTimeout(execute, 1000);
}

execute();

