// main.js --> the directory page (index.html)
// all 20 blobs are already in index.html. this just fills in the ones people claimed

window.addEventListener('load', async () => {
	// get everyone who signed up from server.js
	let response = await fetch('/designers');
	let data = await response.json();
	console.log("here's the data");
	console.log(data);

	// go through each person and fill in their blob
	for (let i = 0; i < data.designers.length; i++) {
		let person = data.designers[i];

		// person.spot is the number of the blob they picked (0-19)
		// so if they picked spot 3 --> drawing3, name3, role3, website3 in index.html
		let drawing = document.getElementById('drawing' + person.spot);
		drawing.src = person.drawing;
		drawing.style.display = 'block';
		document.getElementById('name' + person.spot).textContent = person.firstName;
		document.getElementById('role' + person.spot).textContent = person.role;
		document.getElementById('website' + person.spot).textContent = person.website;
	}
});
