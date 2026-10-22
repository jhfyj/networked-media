// main.js --> the directory page (views/home.njk)

// async because we have to wait for the server to send back the designers
window.addEventListener('load', async () => {
	// get the designers from server.js
	let response = await fetch('/project3/designers');
	let data = await response.json();
	console.log("here's the data");
	console.log(data);

	// all 20 blobs are already on the page (home.njk)
	// so i just fill in the spots people claimed
	for (let i = 0; i < data.designers.length; i++) {
		let person = data.designers[i];

		// the drawing goes on top of the blob
		// person.drawing is the png as a long string. it works as the src
		let drawing = document.getElementById('drawing' + person.spot);
		drawing.src = person.drawing;
		// it's hidden in the css until someone claims the spot
		drawing.style.display = 'block';

		document.getElementById('name' + person.spot).textContent = person.firstName;
		document.getElementById('role' + person.spot).textContent = person.role;
		document.getElementById('website' + person.spot).textContent = person.website;
	}
});
