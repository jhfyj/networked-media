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
		visibility: 'public'
	});
}

let classmates = ['@annafeng'];

let emoji = ['👀', '🥤', '🧋', '🍵'];

setInterval(async () => {
	let hour = new Date().getHours();
	if (hour >= 1 && hour < 9) {
		console.log('bot is sleeping zzz');
		return;
	}

	let url = 'http://159.223.135.171:5006/api/drinks';
	let response = await fetch(url);
	let json = await response.json();

	let randDrink = Math.floor(Math.random() * json.drinks.length);
	let drink = json.drinks[randDrink];

	let randPerson = Math.floor(Math.random() * classmates.length);
	let person = classmates[randPerson];

	let randEmoji = Math.floor(Math.random() * emoji.length);

	let post = person + ' you should try a ' + drink.drink + ' ' + drink.emoji + emoji[randEmoji];

	console.log(post);

	// make our status
	makeStatus(post);
}, 900000);
