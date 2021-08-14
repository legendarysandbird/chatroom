const button = document.getElementById("button");
const history = document.getElementById("history");

button.onclick = () => {
	fetch("/chat").then(function(response) {
		response.text().then( (text) => {
			history.textContent = text;
		});
	}).then(function(data) {
		console.log(data);
	}).catch(function() {
		console.log("Booo");
	});
}

fetch("/chat").then(function(response) {
	response.text().then( (text) => {
		history.innerHTML = text;
	});
}).then(function(data) {
	console.log(data);
}).catch(function() {
	console.log("Booo");
});
