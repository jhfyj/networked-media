// this builds off of class-18-demo
// we are adding the fetch request in our interval function

require('dotenv').config();

const m = require('masto');

const masto = m.createRestAPIClient({
	url: 'https://networked-media.itp.io/',
	accessToken: process.env.TOKEN
});

async function makeStatus(text) {
	const status = await masto.v1.statuses.create({
		status: text,
		// change visability to public when project ready to run
		visibility: 'private'
	});
}

setInterval(async () => {
	// TODO ADD API REQUEST

	let url = 'http://68.183.19.37:6001/get-data';
	let response = await fetch(url);
	let json = await response.json();

	// what do you want to do with your partner's data?

	let emoji = ['😭', '🤩', '💖'];

	// randomly generate a number within the array list
	let rand = Math.floor(Math.random() * emoji.length);

	// select an emoji from the array using a random index
	let post = json[0] + emoji[rand];
	//DOUBLE CHECK ON THIS not sure how to make post yet

	console.log(post);

	// make our status
	makeStatus(post);
}, 10000);
