// main.js --> the directory page (index.html)

// the blob colors in order, same as my figma. 4 rows of 5
// (claim.js has the same list so the colors match on both pages)
let colors = [
	'red',
	'orange',
	'green',
	'blue',
	'orange',
	'orange',
	'red',
	'red',
	'green',
	'red',
	'orange',
	'green',
	'red',
	'orange',
	'blue',
	'green',
	'orange',
	'blue',
	'red',
	'orange'
];

// async because we have to wait for the server to send back the designers
window.addEventListener('load', async () => {
	// get the designers from server.js
	let response = await fetch('/designers');
	let data = await response.json();
	console.log("here's the data");
	console.log(data);

	let designers = data.designers;
	let directory = document.getElementById('directory');

	// footer date
	document.getElementById('last-added').textContent = data.lastAdded;

	// make one spot for every blob
	for (let i = 0; i < data.totalSpots; i++) {
		// check if someone claimed this spot
		let person = undefined;
		for (let j = 0; j < designers.length; j++) {
			if (designers[j].spot == i) {
				person = designers[j];
			}
		}

		//1. make the element
		let spot = document.createElement('div');
		//2. modify it
		spot.classList.add('spot');

		// the box that holds the blob + the drawing on top of it
		let face = document.createElement('div');
		face.classList.add('face');

		let blob = document.createElement('img');
		blob.classList.add('blob');
		blob.src = 'assets/blob-' + colors[i] + '.svg';
		blob.alt = '';

		if (person == undefined) {
			// nobody here yet --> just the blob. clicking it goes to the claim page
			face.appendChild(blob);
			spot.appendChild(face);
			spot.classList.add('open');
			spot.addEventListener('click', () => {
				window.location.href = 'claim.html';
			});
			//3. add it to the page
			directory.appendChild(spot);
			// continue skips the rest of the loop and goes to the next spot
			continue;
		}

		if (person.picture != '') {
			// only for me rn because my face is a picture
			let picture = document.createElement('img');
			picture.classList.add('picture');
			picture.src = person.picture;
			picture.alt = person.firstName;
			face.appendChild(picture);
		} else {
			face.appendChild(blob);
			// the drawing is a png the server saved. it goes right on top of the blob
			let drawing = document.createElement('img');
			drawing.classList.add('drawing');
			drawing.src = person.drawing;
			drawing.alt = '';
			face.appendChild(drawing);
		}
		spot.appendChild(face);

		// initials --> J.H
		let initials = document.createElement('p');
		initials.classList.add('initials');
		// names aren't required so only add a letter if they typed something
		let first = '';
		let last = '';

		let role = document.createElement('p');
		role.classList.add('role');
		role.textContent = person.role;
		spot.appendChild(role);

		// their email, just as text
		let email = document.createElement('p');
		email.classList.add('email');
		email.textContent = person.email;
		spot.appendChild(email);

		directory.appendChild(spot);
	}
});
