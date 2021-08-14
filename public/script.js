const button = document.getElementById("button");
const history = document.getElementById("history");

function execute() {
	fetch("/chat").then(function(response) {
		response.text().then( (text) => {
			history.innerHTML = text;
		});
		return "Something";
	}).then(function(data) {
		console.log(data);
	}).catch(function() {
		console.log("Booo");
	}).finally(() => {
		setTimeout(execute, 500);
	});
}

execute();