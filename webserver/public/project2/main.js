// window.onLoad is short for this
window.addEventListener('load', () => {
	let background = `
+++++++******************************+++++++++
+++++++++++++++***************###****+++++++++
****************************#########++++*****
+++++++**********************####***++++++++++
++++++++++***************************==+++++++
+++++++++++++*********+++++**********===++++++
+++++++++++++++++++++++++++*++*****=======++++
===========+++++++++++++++++++++++++******++++
============================+++++++++++*****++
---=================++++++++++++++++++========
-----============++++++++++++++++++==========-
------==============++++++++++++++++++======--
---=---=============+++++++++++++++++++====---
----------==--=================++++++++++-----
-------------------=================++++------
--:---------------=========================---
---:----------------------==================--
--=++==+--------------:---------=======+==***#
+++++++***+=----:::::::::-:----==+==++==*###%%
%%%######***#*+-----------*###%%%%%%%%%%%%%%%%
@@@@@@@@@@@@@@@@@%%%%%%%@%%%%@@@%@@%%#@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@%%%%%%%%###%%%%#%@%%%
*+++++++++++++++********+++++++**++**+********
%####*#*#****+**++**#%%#*+**+++##**#####*##%##
*##**#%#****+***##***##**#%*++**#%***####**##%
%%#######**####%@@@@@%####*#%#***#%#+*##%@@@%#
********%%%%@@@@@@%##########*###%%***#**###*#
%@@@%@@@@@@@@@%%%#%%@##%#**#%%@%@@##%#**#%@#*%
@@@@@@@@@@@@@%%%%%%%@@%##%%@@@@%######*#%%##%%
`;
	let rows = background.split('\n');
	// --> this lets you split by arrays of lines
	//https://www.w3schools.com/jsref/jsref_split.asp

	let asciiBG = document.getElementById('ascii');
	asciiBG.textContent = background;
	console.log(rows[1]);

	let weather = Math.floor(Math.random() * 3);

	if (weather == 1) {
		let background = `
+++++++******************************+++++++++
+++++++++++++++***************###****+++++++++
****************************#########++++*****
+++++++**********************####***++++++++++
++++++++++***************************==+++++++
++++++++☁️++++*********+++++**********===+++++
+++++++++++++++++++++++++++*++*****=======++++
===========+++++++++++++++++++++++++******++++
============================+++++++++++*****++
---=================++++++++++++++++++========
-----============+++++++++++++☁️++++=========
------==============++++++++++++++++++======--
---=---=============+++++++++++++++++++====---
----------==--=================++++++++++-----
-------------------=================++++------
--:---------☁️-----=========================-
---:----------------------==================--
--=++==+--------------:---------=======+==***#
+++++++***+=----:::::::::-:----==+==++==*###%%
%%%######***#*+-----------*###%%%%%%%%%%%%%%%%
@@@@@@@@@@@@@@@@@%%%%%%%@%%%%@@@%@@%%#@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@%%%%%%%%###%%%%#%@%%%
*+++++++++++++++********+++++++**++**+********
%####*#*#****+**++**#%%#*+**+++##**#####*##%##
*##**#%#****+***##***##**#%*++**#%***####**##%
%%#######**####%@@@@@%####*#%#***#%#+*##%@@@%#
********%%%%@@@@@@%##########*###%%***#**###*#
%@@@%@@@@@@@@@%%%#%%@##%#**#%%@%@@##%#**#%@#*%
@@@@@@@@@@@@@%%%%%%%@@%##%%@@@@%######*#%%##%%
`;

		let rows = background.split('\n');
		// --> this lets you split by arrays of lines
		//https://www.w3schools.com/jsref/jsref_split.asp

		let asciiBG = document.getElementById('ascii');
		asciiBG.textContent = background;

		setInterval(() => {
			for (let i = 1; i < 18; i++) {
				// for loop for the top few lines
				let line = rows[i];
				rows[i] = line.slice(1) + line[0];
				//line.slice(1) --> gives you the row withou the first character (line[0] is the first character)
				// you add line 0 to the end of the spliced line
			}
			asciiBG.textContent = rows.join('\n');

			let grid = [];

			for (let i = 0; i < rows.length; i++) {
				//making the image smaller to account for larger emoji

				let rowArrays = rows[i].split(``);

				// you can split rows[i] because it is a string

				grid.push(rowArrays);
				console.log(grid);
			}

			grid[4][35] = '☀️';
			grid[4][36] = '';
			let text = [];

			for (let i = 0; i < grid.length; i++) {
				text.push(grid[i].join(''));
			}

			asciiBG.textContent = text.join('\n');
		}, 200);
	} else if (weather == 2) {
		//rainy weather
		// need to move raindrop down vertically
		//original position of raindrop
		// assign each symbol to a place on the grid
		//change everything to array
		//have to split rows again bc it's returning in the format of ["", "", "",...]
		// so like a bunch of lines
		//only strings can be split

		let grid = [];

		for (let i = 0; i < rows.length; i++) {
			//making the image smaller to account for larger emoji

			let rowArrays = rows[i].split(``);

			// you can split rows[i] because it is a string

			grid.push(rowArrays);
			console.log(grid);
			//pushing is pushing all of the split individual characters into an array
		}
		// column first, then row
		grid[3][16] = '🌧️';
		grid[2][32] = '🌧️';
		grid[1][6] = '🌧️';
		grid[3][33] = '';
		grid[1][33] = '';
		grid[3][grid[3].length - 1] = '';
		grid[1][grid[3].length - 1] = '';
		grid[2][grid[3].length - 2] = '';
		grid[2][grid[3].length - 1] = '';
		grid[17][6] = '🌳';
		grid[17][grid[3].length - 1] = '';

		grid[19][30] = '🌳';
		grid[19][33] = '';

		let text = [];

		for (let i = 0; i < grid.length; i++) {
			text.push(grid[i].join(''));
		}

		asciiBG.textContent = text.join('\n');

		let y1 = 3;
		let col1 = 10;
		let y2 = 13;
		let col2 = 26;

		let original1 = grid[y1][col1];
		let originalNext1 = grid[y1][col1 + 1];

		let original2 = grid[y2][col2];
		let originalNext2 = grid[y2][col2 + 1];

		//saving an original copy

		setInterval(() => {
			grid[y1][col1] = original1;
			grid[y1][col1 + 1] = originalNext1;
			// redrawing original copy at the beginning

			y1++;

			if (y1 > 18) {
				y1 = 1;
				// looping so it comes back up
			}

			original1 = grid[y1][col1];
			originalNext1 = grid[y1][col1 + 1];

			grid[y1][col1] = '💧';
			grid[y1][col1 + 1] = '';
			// get rid of hte element next to it to make it look the same

			let text = [];
			for (let i = 0; i < grid.length; i++) {
				text.push(grid[i].join(''));
			}

			asciiBG.textContent = text.join('\n');
		}, 200);

		setInterval(() => {
			grid[y2][col2] = original2;
			grid[y2][col2 + 1] = originalNext2;
			// redrawing original copy at the beginning

			y2++;

			if (y2 > 19) {
				y2 = 1;
				// looping so it comes back up
			}

			original2 = grid[y2][col2];
			originalNext2 = grid[y2][col1 + 2];

			grid[y2][col2] = '💧';
			grid[y2][col2 + 1] = '';
			// get rid of hte element next to it to make it look the same

			let text = [];
			for (let i = 0; i < grid.length; i++) {
				text.push(grid[i].join(''));
			}

			asciiBG.textContent = text.join('\n');
		}, 200);
	}
});
