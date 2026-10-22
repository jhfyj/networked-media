// claim.js --> the claim page (claim.html)
// step 1 = pick a blob, step 2 = draw your face + fill out the form

// these change while you're drawing
let isDrawing = false;
let tool = 'pen';

window.addEventListener('load', async () => {
	let step1 = document.getElementById('step1');
	let step2 = document.getElementById('step2');

	// ask the server which spots are taken already
	let response = await fetch('/designers');
	let data = await response.json();
	console.log(data);

	// STEP 1 --> picking a blob
	// all 20 blobs are already in claim.html
	let blobs = document.querySelectorAll('.pick-blob');
	for (let i = 0; i < blobs.length; i++) {
		blobs[i].addEventListener('click', () => {
			console.log('picked spot ' + i);
			// remember which spot they picked so it gets sent with the form
			document.getElementById('spot-input').value = i;
			// show the same blob behind the canvas
			document.getElementById('canvas-blob').src = blobs[i].src;
			// switch to step 2
			step1.style.display = 'none';
			step2.style.display = 'block';
		});
	}

	// turn the taken blobs gray
	for (let i = 0; i < data.designers.length; i++) {
		let taken = document.getElementById('pick' + data.designers[i].spot);
		taken.src = 'assets/blob-gray.svg';
		taken.classList.add('taken');
	}

	// back button on step 2 goes back to the blobs
	document.getElementById('back-button').addEventListener('click', () => {
		step2.style.display = 'none';
		step1.style.display = 'block';
	});

	// STEP 2 --> drawing on a canvas
	// the canvas sits right on top of the blob picture
	let canvas = document.getElementById('draw-canvas');
	// ctx is what you actually draw with
	let ctx = canvas.getContext('2d');
	ctx.lineWidth = 4;
	ctx.lineCap = 'round';
	ctx.strokeStyle = 'black';

	// pointer events work for the mouse AND fingers on a phone
	// offsetX / offsetY = where the mouse is inside the canvas
	canvas.addEventListener('pointerdown', (e) => {
		isDrawing = true;
		ctx.beginPath();
		ctx.moveTo(e.offsetX, e.offsetY);
	});

	canvas.addEventListener('pointermove', (e) => {
		if (isDrawing == false) {
			return;
		}
		if (tool == 'pen') {
			// normal drawing
			ctx.globalCompositeOperation = 'source-over';
			ctx.lineWidth = 4;
		} else {
			// eraser --> destination-out makes whatever you go over see through again
			ctx.globalCompositeOperation = 'destination-out';
			ctx.lineWidth = 20;
		}
		ctx.lineTo(e.offsetX, e.offsetY);
		ctx.stroke();
	});

	// stop drawing when you let go anywhere on the page
	document.addEventListener('pointerup', () => {
		isDrawing = false;
	});

	// pen + eraser
	let pen = document.getElementById('pen');
	let eraser = document.getElementById('eraser');

	pen.addEventListener('click', () => {
		tool = 'pen';
		pen.classList.add('selected');
		eraser.classList.remove('selected');
	});

	eraser.addEventListener('click', () => {
		tool = 'eraser';
		eraser.classList.add('selected');
		pen.classList.remove('selected');
	});

	// SUBMIT
	// right before the form sends, put the drawing in the hidden input so it goes with everything else
	let form = document.getElementById('profile-form');
	form.addEventListener('submit', () => {
		// turns the drawing into a png. it comes out as a really long string (data:image/png;base64,....)
		// the background is see through so only the lines get saved, not the blob
		document.getElementById('drawing-input').value = canvas.toDataURL('image/png');
	});
});
