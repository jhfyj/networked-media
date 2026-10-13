// importing the epxerss library to use it as our server
// naming convention --> usually name the variable the library name
// we not gon modify express --> hence why const
const express = require('express');

//initialize our application using express
// basically --> let current date = new date
const app = express();

//"middleware"
// this is settings that our app needs ot know about our server

//allows us to access front-end with GET requests by default
//serves our front-end html that exists in the public folder
app.use(express.static('public'));
//allows us to access the body of a POST request
app.use(express.urlencoded({ extended: true }));

//ROUTES
// location that we can send and receive through our server
//GET /first-server, callback function
app.get('/first-server', (request, response) => {
	//send info to the client that make a request to /first-server
	response.send('this is my first server');
});

//LAST THING we must add
//PORT, callback function
app.listen(8080, () => {
	console.log('http://127.0.0.1:8080/');
});
