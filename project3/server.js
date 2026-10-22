// importing express to use it as our server
const express = require('express');
// importing nunjucks, the templating library. it turns the .njk files in my views folder into pages
// (npm install nunjucks)
const nunjucks = require('nunjucks');

// initialize our application using express
const app = express();

// "middleware"
// serves everything in the public folder (css, front end js, images)
// everything goes under /project3 so it matches project1 + project2 --> localhost:8080/project3
app.use('/project3', express.static('public'));
// lets us read request.body from the form (POST)

// limit is bigger than normal because the drawing png comes in as a really long string
// realized this after trying it out
app.use(express.urlencoded({ extended: true, limit: '5mb' }));

// nunjucks settings (same as the class 15 demo)
// this links express to nunjucks. all my .njk files are in the views folder
nunjucks.configure('views', {
	autoescape: true,
	express: app
});
app.set('view engine', 'njk');

// how many blobs are on the page. only 20 for now --> 4 rows of 5
let totalSpots = 20;

// all of the designers get saved in here
// NOTE: this is just an array so it resets every time i restart the server
// i need to figure out how to actually save it somewhere later --> database???
// starts empty. everyone gets added from the claim page
let designers = [];

// ROUTES

// PAGES
// response.render looks for the file in the views folder
app.get('/project3', (request, response) => {
	response.render('home.njk');
});

// the claim page. this is where the qr code goes
app.get('/project3/claim', (request, response) => {
	response.render('claim.njk');
});

// my canvas test from before i built the claim page
app.get('/project3/canvas-test', (request, response) => {
	response.render('canvas-test.njk');
});

// DATA
// the front end fetches this to fill in the directory (same idea as fetching the weather api in project 2)
app.get('/project3/designers', (request, response) => {
	console.log('someone asked for the designers');
	// sending an object back turns it into json automatically
	response.send({
		designers: designers,
		totalSpots: totalSpots
	});
});

// the form on the claim page sends everything here
app.post('/project3/add-designer', (request, response) => {
	// console.log in server.js only shows up in the terminal not the browser
	console.log(request.body);

	let data = request.body;
	// everything from a form comes in as a string so turn the spot into a number
	let spot = Number(data.spot);

	// make sure the spot is real
	if (data.spot == '' || spot < 0 || spot >= totalSpots) {
		response.send('that spot does not exist :( <a href="/project3/claim">go back</a>');
		return;
	}

	// make sure nobody took the spot while this person was drawing
	for (let i = 0; i < designers.length; i++) {
		if (designers[i].spot == spot) {
			response.send(
				'someone already claimed that spot :( <a href="/project3/claim">pick another one</a>'
			);
			return;
		}
	}

	let newDesigner = {
		// spot, name, role, website, drawing
		spot: spot,
		firstName: data.firstName,
		lastName: data.lastName,
		role: data.role,
		website: data.website,
		// the drawing is the png as a long string (data:image/png;base64,....)
		// i just keep the whole string. an img tag can show it as the src, so i dont need to save a file
		drawing: data.drawing
	};

	// push adds it to the end of the array
	designers.push(newDesigner);
	console.log('added a new designer! there are ' + designers.length + ' now');

	// send them back to the directory so they can see themselves on the list
	response.redirect('/project3');
});

// LAST
// PORT, callback function
// to start: cd into project3 then node server.js (nunjucks looks for the views folder from here)
app.listen(8080, () => {
	console.log('restarting the server');
	console.log('http://localhost:8080/project3');
});
