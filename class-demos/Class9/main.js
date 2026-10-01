// window.onLoad is short for this
window.addEventListener('load', () => {
	// document.body is hte selector to retreive the body html element

	//function mousePressed(){
	//  print (mouseX, mouseY);
	//{}

	//note the variable e --> referencing to event
	//e is a paramter in the anonymous arrow function
	//all of the information about the event
	document.body.addEventListener('click', (e) => {
		console.log('document.body was clicked');
		console.log(`${e.clientX}, ${e.clientY}`);
		//same thing -->
		// console.log(e.clientX + ' ' + e.clientY);

		// can not print both automaticlaly

		//IMPORTANT => key presses need to be on the document itself
	});

	document.addEventListener('keydown', (e) => {
		let textDiv = document.getElementById('text');
		console.log(e.key);
		textDiv.textContent += e.key;

		if (e.key == ' ') {
			textDiv.textContent += '👍';
		}
	});
});
