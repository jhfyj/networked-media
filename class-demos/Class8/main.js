// this is a comment
// syntax is //

// alert('javascript!');

console.log('log this info to the console.');

let colors = ['#d7999f', '#641584', '#88c039', '#dea6e0', '#5ab0b8'];

// window.addEventListener("load", ()=>{
//     console.log("fully loaded");
// })

// short hand for waiting for the webpage to load

window.onload = () => {
	console.log('page has loaded.');
	//get elemetn by id
	let mainElement = document.getElementById('main');
	mainElement.style.color = 'green';
	//javascript has higher priority to css. overwrites css rules
	console.log(mainElement);

	// query selecton --? retrieves a SINGLE element using the css selector
	//doesnt need to have an id
	let firstParagraph = document.querySelector('p');
	let blueParagraph = document.querySelector('.blue');
	let Stuff3 = document.querySelector('#main');

	firstParagraph.textContent = 'i have updated the text with js';
	blueParagraph.style.backgroundColor = 'navy';

	//retrieves a single js element using an id
	let blueClass = document.getElementsByClassName('blue');

	let containerDiv = document.querySelector('#blue-div');

	for (let i = 0; i < 60; i++) {
		//CREAITNG AN ELEMENT ON A WEBPAGE
		//1. declare what type of element we are creating
		let newSpan = document.createElement('span');
		//2. modify that element
		newSpan.textContent = 'new span';
		newSpan.classList.add('all-spans');
		//3. add the created element to the page
		//anywhere on the bottom fot he html: document.body
		//in a specific container

		let c = Math.floor(Math.random() * colors.length);

		//call back -->
		//set interval is built into
		let rotation = 0;
		setInterval(() => {
			console.log('2 seconds have passed');
			let allSpans = document.querySelectorAll('.all-spans');
			console.log(allSpans);
			for (let s of allSpans) {
				//doesnt have to be s. can be anything

				// ` this symbol is in top left
				allspans = s.style.transform = `rotate(${rotation}deg)`;
				rotation++;
				// special type of quotation that allows you to inject variables into strings
				// the dollar sign lets u put variable's value inside a string and only works inside of ``
				// console.log(s.style.transform);
			}
		}, 2000);

		newSpan.style.backgroundColor = colors[c];

		// the following two also work
		// setInterval(function () {}, 2000);

		// setInterval(RandomizeColors, 500);
		// function RandomizeColors() {
		// 	c = Math.floor(Math.random() * colors.length);
		// 	newSpan.style.backgroundColor = colors[c];
		// }

		containerDiv.appendChild(newSpan);
	}
};

// document --> referring to html
// document. --> using a function that is on the html properties
// object -->{}.
// variable is holding data
// pet.name or pet["name"] --> both get the "name" property (here a string)
// pet.age  or pet["age"]  --> both get the "age" property (here a number)
// use brackets when the key is in a variable or has spaces/dashes

// get elemnt by id --> grab a single element using id attribute
// get elements by class --> will give you multiple pieces of data
//query selector all --> multiple. getting u all of them\

//window.onload is similar to the setup/draw
//all of our code should go inside of the window.onload
