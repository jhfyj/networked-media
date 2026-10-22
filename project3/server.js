// importing express to use it as our server
const express = require('express');
// importing edge, the templating library. it turns the .edge files in my views folder into pages
// (npm install edge.js)
const { Edge } = require('edge.js');

// initialize our application using express
const app = express();

// "middleware"
// serves everything in the public folder (css, front end js, images)
app.use(express.static('public'));
// lets us read request.body from the form (POST)

// limit is bigger than normal because the drawing png comes in as a really long string
// realized this after trying it out
app.use(express.urlencoded({ extended: true, limit: '5mb' }));

// edge settings. tells edge that all my .edge files are in the views folder
const edge = Edge.create();
// just 'views' didnt work (it kept looking for views/views/views/index.edge??)
// edge wants the full path. process.cwd() is the folder i ran node server.js from (project3)
edge.mount(process.cwd() + '/views');

// how many blobs are on the page. only 20 for now --> 4 rows of 5
let totalSpots = 20;

// all of the designers get saved in here
// NOTE: this is just an array so it resets every time i restart the server
// i need to figure out how to actually save it somewhere later --> database???
// starts empty. everyone gets added from the claim page
let designers = [];

// ROUTES

// PAGES
// edge.render needs the name of the .edge file (no .edge at the end)
// it takes a sec to make the page so we have to await it --> async
app.get('/', async (request, response) => {
	let page = await edge.render('index');
	response.send(page);
});

// the claim page. this is where the qr code goes
app.get('/claim', async (request, response) => {
	let page = await edge.render('claim');
	response.send(page);
});

// my canvas test from before i built the claim page
app.get('/canvas-test', async (request, response) => {
	let page = await edge.render('canvas-test');
	response.send(page);
});

// DATA
// the front end fetches this to fill in the directory (same idea as fetching the weather api in project 2)
app.get('/designers', (request, response) => {
	console.log('someone asked for the designers');
	// sending an object back turns it into json automatically
	response.send({
		designers: designers,
		totalSpots: totalSpots
	});
});

// the form on the claim page sends everything here
app.post('/add-designer', (request, response) => {
	// console.log in server.js only shows up in the terminal not the browser
	console.log(request.body);

	let data = request.body;
	// everything from a form comes in as a string so turn the spot into a number
	let spot = Number(data.spot);

	// make sure the spot is real
	if (data.spot == '' || spot < 0 || spot >= totalSpots) {
		response.send('that spot does not exist :( <a href="/claim">go back</a>');
		return;
	}

	// make sure nobody took the spot while this person was drawing
	for (let i = 0; i < designers.length; i++) {
		if (designers[i].spot == spot) {
			response.send('someone already claimed that spot :( <a href="/claim">pick another one</a>');
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
	response.redirect('/');
});

// LAST
// PORT, callback function
// to start: cd into project3 then node server.js (edge looks for the views folder from here)
app.listen(8080, () => {
	console.log('restarting the server');
	console.log('http://127.0.0.1:8080/');
});
