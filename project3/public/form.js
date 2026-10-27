// form.js --> the form page (views/form.njk)
// pick a blob at the top, then draw your face + fill out the form under it (all on one page)

// these change while you're drawing
let isDrawing = false;
let isErasing = false;

window.addEventListener('load', async () => {
	// ask the server which spots are taken already
	let response = await fetch('/project3/designers');
	let data = await response.json();
	console.log(data);

	// PICKING A BLOB
	// all 20 blobs come from partial-spots.njk (the same ones as the home page)
	// #picker .blob = only the blob pictures inside the picker
	let blobs = document.querySelectorAll('#picker .blob');
	for (let i = 0; i < blobs.length; i++) {
		blobs[i].addEventListener('click', () => {
			console.log('picked spot ' + i);
			// remember which spot they picked so it gets sent with the form
			document.getElementById('spot-input').value = i;
			// show the same blob behind the canvas
			document.getElementById('canvas-blob').src = blobs[i].src;
		});
	}

	// turn the taken blobs gray
	for (let i = 0; i < data.designers.length; i++) {
		let taken = document.getElementById('blob' + data.designers[i].spot);
		taken.src = '/project3/assets/blob-gray.svg';
		taken.classList.add('taken');
	}

	// DRAWING ON A CANVAS
	// the canvas sits right on top of the blob picture
	// drawing code is from this tutorial: https://medium.com/@akhil-mottammal/day-1-build-a-simple-drawing-app-with-an-eraser-in-javascript-f17dfc43f4fa
	// i changed mousedown/mousemove/mouseup to pointer events so it works with fingers on a phone too
	let canvas = document.getElementById('draw-canvas');
	let eraseBtn = document.getElementById('eraser');
	let penBtn = document.getElementById('pen');
	let ctx = canvas.getContext('2d');

	// the tutorial changes the button text here (eraseBtn.textContent = ...)
	// but that deletes my eraser icon, so i just move the gray box instead
	eraseBtn.addEventListener('click', () => {
		isErasing = !isErasing; // switch between eraser and pen
		if (isErasing) {
			eraseBtn.classList.add('selected');
			penBtn.classList.remove('selected');
		} else {
			eraseBtn.classList.remove('selected');
			penBtn.classList.add('selected');
		}
	});

	// pen button goes back to drawing
	penBtn.addEventListener('click', () => {
		isErasing = false;
		penBtn.classList.add('selected');
		eraseBtn.classList.remove('selected');
	});

	canvas.addEventListener('pointerdown', (e) => {
		isDrawing = true;
		ctx.beginPath();
		ctx.moveTo(e.offsetX, e.offsetY);
	});

	canvas.addEventListener('pointermove', (e) => {
		if (isDrawing) {
			if (isErasing) {
				ctx.clearRect(e.offsetX, e.offsetY, 20, 20); // eraser size 20x20
			} else {
				ctx.lineTo(e.offsetX, e.offsetY);
				ctx.strokeStyle = 'black';
				ctx.lineWidth = 4;
				ctx.stroke();
			}
		}
	});

	// the tutorial has this on the canvas, but then if you let go outside the canvas it keeps drawing when you come back
	// so i put it on the whole page
	document.addEventListener('pointerup', () => {
		isDrawing = false;
	});

	// clear button wipes the whole canvas
	let btn = document.getElementById('clear');
	btn.addEventListener('click', () => {
		ctx.clearRect(0, 0, canvas.width, canvas.height); // clear the canvas
	});

	// SUBMIT
	// right before the form sends, put the drawing in the hidden input so it goes with everything else
	// hidden input + toDataURL idea from this tutorial: https://www.askingbox.com/tutorial/send-html5-canvas-as-image-to-server
	// what toDataURL gives back (mdn): https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toDataURL
	let form = document.getElementById('profile-form');
	form.addEventListener('submit', () => {
		// turns the drawing into a png. it comes out as a really long string (data:image/png;base64,....)
		// the background is see through so only the lines get saved, not the blob
		document.getElementById('drawing-input').value = canvas.toDataURL('image/png');
		//only adding the drawing here. the rest are covered because they already use the form input. I just need to make sure this image gets sent
	});
});
