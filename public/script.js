const button = document.getElementById("button");
const history = document.getElementById("history");
const text = document.getElementById("text");
const clearName = document.getElementById("clearname");

let allItems;
let username = '';

function login() {
	fetch("/username").then((res) => {
		res.text().then((text) => {
			username = text;
			while (username == '') {
				username = prompt("Enter your name: ");
				fetch("/login", {
					method: "POST",
					body: JSON.stringify({"username": username}),
					headers: {
						'Content-type': 'application/json'
					}
				}).then((res) => {
					if (username == '') {
						alert("That name is already taken!");
					}
					login();
				});
			}	
		});
	});

	//console.log(username);
}

function displayChat(to) {
	// Start with empty slate
	to.innerHTML = '';
	to.classList.add("textLine");

	// Add text one line at a time
	allItems.forEach(item => {
		//console.log(allItems);
		let str = `[${item.date}] ${item.name}: ${item.message}`;
		const line = document.createElement("p");
		const words = document.createTextNode(str);
		line.append(words);
		to.appendChild(line);		

		const emojis = document.createElement("div");
		emojis.classList.add("emojis");

		const keys = Object.keys(item.emojis);
		keys.forEach(emoji => {
			//console.log(emoji);
			const sym = document.createElement("div");
			sym.classList.add("emoji");
			
			const icon = document.createElement("button");
			icon.onclick = () => {
				fetch("/emoji/add", {
					method: "POST",
					body: JSON.stringify({
						id: item.id,
						emoji: emoji
					}),
					headers: {
						'Content-type': 'application/json'
					}
				}).then(() => {
					console.log("Done");
				});	
			}

			icon.classList.add("far");
			icon.classList.add(emoji);
			const num = document.createElement("p");
			const numText = document.createTextNode(item.emojis[emoji]);

			num.append(numText);
			
			sym.appendChild(icon);
			sym.appendChild(num);

			emojis.append(sym);
		});

		to.append(emojis);
	});
}

function execute() {
	fetch("/chat").then(function(response) {
		response.text().then( (text) => {
			allItems = JSON.parse(text);
			displayChat(history);
		});
		return "Something";
	}).then(function(data) {
		//console.log(data);
	}).catch(function() {
		//console.log("Booo");
	}).finally(() => {
		setTimeout(execute, 500);
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
			}).then(() => {
				history.value = ''
			});
		}
		else {
			let x = fetch("/", {
				method: "POST",
				body: JSON.stringify({
					name: username,
					message: text.value,
					date: time
				}),
				headers: {
					'Content-type': 'application/json'
				}
			});

			x.then((data) => {
				text.value = ''
				//console.log(data);
			}).catch(function() {
				alert('Chat disconnected!');
				location.reload();
			});


		}
	}
}

clearName.onclick = () => {
	fetch("/clear/name").then(() => {
		login();
	});
};

login();
execute();
