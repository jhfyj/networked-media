const express = require('express');
const multer = require('multer');
const nedb = require('@seald-io/nedb');
const nunjucks = require('nunjucks');
const cookieParser = require('cookie-parser');

// require is the word that you use to import the library
// import vs require --> where you are using common or module
const bcrypt = require('bcrypt');
// bcrypt --> encrypts the password when asking for login. so you are not storing raw data inside of a file
const expressSession = require('express-session');
const nedbSession = require('nedb-promises-session-store');
// allows us to store the encrypted password into our server. make sure that we don't have to log in every time we go onto a website



const app = express();
const upload = multer({
	dest: 'public/uploads',
});
const database = new nedb({
	filename: 'database.db',
	autoload: true,
});

// users database (up here so both /register and /authenticate can use it)
const userdb = new nedb({
	filename: 'userdb.db',
	autoload: true,
});

nunjucks.configure('views', {
	autoescape: true,
	express: app,
	noCache: true,
});

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'njk');
app.use(cookieParser());

app.get('/', (req, res) => {
	let totalVisits = 1;

	if (req.cookies.visits) {
		let convertToNumber = parseInt(req.cookies.visits);
		totalVisits = convertToNumber + 1;
	}

	res.cookie('visits', totalVisits, {
		expires: new Date(Date.now() + 100 * 365 * 24 * 60 * 60 * 1000),
	});

	res.render('home.njk', { serverData: totalVisits });
});

app.get('/signup', (req, res)=>{
	res.render('signup.njk')
})


app.get('/login', (req, res)=>{
	res.render('login.njk')
})


app.post('/register',(req, res)=>{
	//  use bcrypt to encrypt the password
	let encryptedPassword = bcrypt.hashSync(req.body.pass, 10)
	let userToBeAdded = {
		username: req.body.username,
		password: encryptedPassword
	}

	userdb.insert(userToBeAdded, (err, insertedUser) => {
		res.redirect('/login')
	})
})

app.post('/authenticate', (req, res) => {
	let searchedUser = {
		username: req.body.username
	}

	userdb.findOne(searchedUser, (err, foundUser) => {
		if(foundUser == null || err){
			res.redirect('/login?username=not-found')
		} else {
			let checkPassword = bcrypt.compareSync(req.body.pass, foundUser.password)
			if (checkPassword){
				res.redirect('/')
			} else {
				res.redirect('/login?password=invalid')
			}
		}
	})
})



app.listen(6005, () => {
	console.log(`http://localhost:6005`);
});