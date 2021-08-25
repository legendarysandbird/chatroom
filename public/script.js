const button = document.getElementById("button");
const history = document.getElementById("history");
const text = document.getElementById("text");

let username = '';
while (username == '') {
	username = prompt("Enter your name: ");
}

function displayChat(to, items) {
	// Start with empty slate
	to.innerHTML = '';

	// Add text one line at a time
	items.forEach(item => {
		const line = document.createElement("p");
		const words = document.createTextNode(item);
		line.append(words);
		to.appendChild(line);		
	});
}

button.onclick = () => {
	let time = new Date().toLocaleTimeString('en-US', { hour12: false,
														hour: "numeric",
														minute: "numeric"});
	if (text.value != '') {
		if (text.value == "!clear" && username == 'admin') {
			fetch("/clear", {
				method: "POST"
			}).then(text.value = '');
		}
		else {
			fetch("/", {
				method: "POST",
				body: JSON.stringify({
					name: username,
					message: text.value,
					date: time
				}),
				headers: {
					'Content-type': 'application/json'
			}
		}).then(text.value = '')

		}
	}
}

function execute() {
	fetch("/chat").then(function(response) {
		response.text().then( (text) => {
			let items = JSON.parse(text);
			displayChat(history, items);
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
