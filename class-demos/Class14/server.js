const express = require('express');
/************
 * import our templating library
 ************/
const nunjucks = require('nunjucks');

const app = express();

//all css and frontend js will go in public folder
app.use(express.static('public'));
//allow us to use request body
app.use(express.urlencoded({ extended: true }));

/************
 * add our nunjucks settings under our middleware
 * this links our express application to the templating tool
 ************/
nunjucks.configure('views', {
	autoescape: true,
	express: app
});

app.set('view engine', 'njk');

app.get('/', (request, response) => {
	// response.render accepts 2 parameters:
	// 1: the name of the njk file
	// 2: a javascript object. the properties you pass into this object are the variables that you use in the .njk files
	// serverData is the name of the variable we used in baseLayout.njk
	response.render('baseLayout.njk', { serverData: 'this is text from my server!!!' });
});

app.listen(8080, () => {
	// to run the server:
	// 1. make sure you are in the correct folder
	// if you type pwd it should print out the path to class_14_demo
	// if it does not show class_14_demo, you need to navigate to the folder using cd
	// 2. in terminal use the starting command: node --watch server.js
	// another way to do this is to add a script in package.json (go to that file and look at line 8)

	//reviewed --> no question - Jen
	console.log('http://localhost:8080');
});
