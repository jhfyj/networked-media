//imports env variables so we dont put passwords into our js files
require('dotenv').config();
const m = require('masto');

//setting up the masto variable to connect to:
//1) url: our masterdon server
//2) token: our passwrod to our account

const masto = m.createRestAPIClient({
	url: 'https://networked-media.itp.io/',
	accessToken: process.env.TOKEN
});

// creating a status for us
//async --> function. making a request to something externally. want to make sure that happens before we do anything else in our code
async function makeStatus(text) {
	//await ensures that it creates the status before we do anything else
	const status = await masto.v1.statuses.create({
		status: text,
		//change visibility to public when project ready to run
		visibility: 'private'
	});
}

setInterval(() => {
	let emoji = ['😭', '🤩', '💖'];

	//randomly generate a number within the array list
	let rand = Math.floor(Math.random() * emoji.length);

	//select an emoji from the array using a random index
	let post = emoji[rand];

	makeStatus(post);
	//this is happening every 5 seconds
}, 5000);
