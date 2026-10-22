// importing express to use it as our server
const express = require('express');
// fs comes with node (no npm install). it lets the server save files
const fs = require('fs');

// initialize our application using express
const app = express();

// "middleware"
// serves everything in the public folder (html, css, front end js, images)
app.use(express.static('public'));
// lets us read request.body from the form (POST)

// limit is bigger than normal because the drawing png comes in as a really long string
// realized this after trying it out
app.use(express.urlencoded({ extended: true, limit: '5mb' }));

// how many blobs are on the page. only 20 for now --> 4 rows of 5
let totalSpots = 20;

// all of the designers get saved in here
// NOTE: this is just an array so it resets every time i restart the server
// i need to figure out how to actually save it somewhere later --> database???
// starts empty. everyone gets added from the claim page
let designers = [];

// ROUTES

// the front end fetches this to draw the directory (same idea as fetching the weather api in project 2)
app.get('/designers', (request, response) => {
	console.log('someone asked for the designers');
	// sending an object back turns it into json automatically
	response.send({
		designers: designers,
		totalSpots: totalSpots
	});
});

// the form on claim.html sends everything here
app.post('/add-designer', (request, response) => {
	// console.log in server.js only shows up in the terminal not the browser
	console.log(request.body);

	let data = request.body;
	// everything from a form comes in as a string so turn the spot into a number
	let spot = Number(data.spot);

	// make sure the spot is real
	if (data.spot == '' || spot < 0 || spot >= totalSpots) {
		response.send('that spot does not exist :( <a href="/claim.html">go back</a>');
		return;
	}

	// make sure nobody took the spot while this person was drawing
	for (let i = 0; i < designers.length; i++) {
		if (designers[i].spot == spot) {
			response.send(
				'someone already claimed that spot :( <a href="/claim.html">pick another one</a>'
			);
			return;
		}
	}

	// SAVING THE DRAWING AS A PNG
	// the drawing comes in like "data:image/png;base64,iVBORw0KG...."
	// the part after the comma is the actual picture, so cut off the start
	let drawing = '';
	if (data.drawing != undefined && data.drawing.startsWith('data:image/png;base64,')) {
		let pictureData = data.drawing.replace('data:image/png;base64,', '');
		// one file per spot --> public/drawings/spot-3.png
		let fileName = 'drawings/spot-' + spot + '.png';
		// base64 tells it how to turn the string back into a picture
		fs.writeFileSync('public/' + fileName, pictureData, 'base64');
		console.log('saved ' + fileName);
		// save where the png is so the directory page can load it
		drawing = fileName;
	}

	let newDesigner = {
		// spot, name, role, website, picture, drawing
		spot: spot,
		firstName: data.firstName,
		lastName: data.lastName,
		role: data.role,
		website: data.website,
		drawing: drawing
	};

	// push adds it to the end of the array
	designers.push(newDesigner);
	console.log('added a new designer! there are ' + designers.length + ' now');

	// send them back to the directory so they can see themselves on the list
	response.redirect('/');
});

// LAST
// PORT, callback function
app.listen(8080, () => {
	console.log('restarting the server');
	console.log('http://127.0.0.1:8080/');
});
