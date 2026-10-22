// testing the drawing canvas by itself first
// if this works ill move it into claim.js

let isDrawing = false;
let tool = 'pen';

window.addEventListener('load', () => {
	let canvas = document.getElementById('test-canvas');
	// paint brush
	let brush = canvas.getContext('2d');
	brush.lineWidth = 4;
	brush.strokeStyle = 'black';

	// FIRST TRY --> mouse events
	// worked on my laptop but not on my phone. on my phone it just scrolled the page
	// canvas.addEventListener('mousedown', (e) => {
	// 	isDrawing = true;
	// });
	// canvas.addEventListener('mousemove', (e) => {
	// 	if (isDrawing == false) {
	// 		return;
	// 	}
	// 	brush.lineTo(e.offsetX, e.offsetY);
	// 	brush.stroke();
	// });
	// canvas.addEventListener('mouseup', () => {
	// 	isDrawing = false;
	// });
	// ALSO every new line was connecting to the end of the last one??
	// --> need beginPath + moveTo when you press down so it starts a new line

	// SECOND TRY --> pointer events. works for the mouse and fingers
	canvas.addEventListener('pointerdown', (e) => {
		isDrawing = true;
		brush.beginPath();
		brush.moveTo(e.offsetX, e.offsetY);
		console.log('down at ' + e.offsetX + ', ' + e.offsetY);
	});

	canvas.addEventListener('pointermove', (e) => {
		if (isDrawing == false) {
			return;
		}
		if (tool == 'pen') {
			brush.globalCompositeOperation = 'source-over';
			brush.lineWidth = 4;
		} else {
			// first i just drew in white for the eraser
			// brush.strokeStyle = 'white';
			// looked fine on a white page but on the orange box the white lines show up. so its not really erasing
			// destination-out actually makes it see through again
			brush.globalCompositeOperation = 'destination-out';
			brush.lineWidth = 20;
		}
		brush.lineTo(e.offsetX, e.offsetY);
		brush.stroke();
	});

	// had this on the canvas at first but if you let go outside the canvas it kept drawing when you came back
	// putting it on the whole page fixed it
	document.addEventListener('pointerup', () => {
		isDrawing = false;
	});

	document.getElementById('pen').addEventListener('click', () => {
		tool = 'pen';
		console.log('pen');
	});

	document.getElementById('eraser').addEventListener('click', () => {
		tool = 'eraser';
		console.log('eraser');
	});

	// wipe everything
	document.getElementById('clear').addEventListener('click', () => {
		brush.clearRect(0, 0, canvas.width, canvas.height);
	});

	// testing if i can turn the drawing into a png
	document.getElementById('save').addEventListener('click', () => {
		let picture = canvas.toDataURL('image/png');
		// its a really long string (data:image/png;base64,....)
		console.log(picture);
		document.getElementById('preview').src = picture;
	});
});
