const express = require('express');
/************
 * import our templating library
 ************/
const nunjucks = require('nunjucks');

const app = express();

//app.use is middleware
//these are setting for our server that happen between whent he server runs and when it received a request
//these are settings
//all css and frontend js will go in public folder
//allow these files to be used
app.use(express.static('public'));
//express.urlencoded allows us to process POST requests
//if you have app.post, we NEED THIS LINE
//allow us to use request body
app.use(express.urlencoded({ extended: true }));

/************
 * add our nunjucks settings under our middleware
 * this links our express application to the templating tool
 ************/
nunjucks.configure('views', {
	autoescape: true,
	express: app
	//views folder has all of our njk files. configured it this way. need to do it on nunjuck's side and
	//express also needs to talk to njk
});

app.set('view engine', 'njk');
//store data on our server using an array variable
let allData = [];

//response.render alwasy go inside an app.get or an app.post

app.get('/', (request, response) => {
	//regular home page rendering
	//new --> change the render file
	response.render('home.njk');
});

app.get('/form', (request, response) => {
	//EVERYTIME U ADD A NEW NJK FILE U GOTTA ADD IT HERE
	response.render('form.njk');
});

app.get('/view-all', (request, response) => {
	// optional second param in response.render: data from the server
	response.render('view-all.njk', { messagesArrayFromServer: allData });
});

app.post('/sendMessage', (request, response) => {
	// for every <form> we need an app.post
	// this acton wll handle:
	// 1. storing the data from the form on the server (in the data array)
	// 2. will redirect to where we want the data to be displayed
	console.log(request.body);
	allData.push(request.body);
	//
	response.redirect('/view-all');
});

//ALWAYS GOES LAST
//start our server to run
//app.listen is now listening for requests
app.listen(8080, () => {
	console.log('http://localhost:8080');
});
