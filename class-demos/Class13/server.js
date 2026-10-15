//npm install express --> create node modules and installed express library
//create server.js
//run server.js --> node server.js
//module --> finger

// // importing the epxerss library to use it as our server
// // naming convention --> usually name the variable the library name
// // we not gon modify express --> hence why const
// const express = require('express');

// //initialize our application using express
// // basically --> let current date = new date
// const app = express();

// //"middleware"
// // this is settings that our app needs ot know about our server

// //allows us to access front-end with GET requests by default
// //serves our front-end html that exists in the public folder
// app.use(express.static('public'));
// //allows us to access the body of a POST request
// app.use(express.urlencoded({ extended: true }));

// //ROUTES
// // location that we can send and receive through our server
// //GET /first-server, callback function
// app.get('/first-server', (request, response) => {
// 	//send info to the client that make a request to /first-server
// 	response.send('this is my first server');
// });

// //LAST THING we must add
// //PORT, callback function
// app.listen(8080, () => {
// 	console.log('http://127.0.0.1:8080/');
// });

// importing the express library to use it as our server
// naming conventions usually name the variable the library name
const express = require('express');

// initialize our application using express
const app = express();

// "middleware"
// this is settings that our app needs to know about our server

// allows us to access front-end with GET requests by default
// serves our front-end html that exists in the public folder
//syntax for GET: app.get(rooute, ann)
//similar t event listner
app.use(express.static('public'));
// allows us to access the body of a POST request
app.use(express.urlencoded({ extended: true }));

// ROUTES -- all of the URL pages we want accesble
app.get('/', (request, response) => {
	console.log('received a request at /route');
	response.send('this is <em>some</em> data!!');
});
//respect will ckmb

// GET /first-server, callback function
app.get('/first-server', (request, response) => {
	// send info to the client that makes a request to /first-server
	response.send('this is my first server!');
	console.log('responding');
});

app.post('/form-upload', (request, response) => {
	// console.og in server js only shows up in the termianl because it is a different console than the one in the browser
	//request.body retrieves the data from the form
	console.log(request.body);
	// send the client to a different route
	response.redirect('/');
});

// LAST
// PORT, callback function
// to start our server: node server.js in terminal
app.listen(8080, () => {
	console.log('restarting the server');
	console.log('http://127.0.0.1:8080/');
});
