var mongoose = require('mongoose');
mongoose.connection.openUri('mongodb://localhost/shopping');

var Product = require('../models/product');

var products = [
	new Product({
	imagePath: 'https://static.giantbomb.com/uploads/original/12/128291/1837361-gothic__cdcovers_cc__front.jpg',
	title: 'Gothic Video Game',
	description: 'Gothic is an open world adventure inspired single player RPG. The game revolves around an unnamed prisoner and his journey through the lands contained in a magical barrier. On his journey he stumbles upon monsters, wizards, camps with ess men and strange sects.',
	price: 10
	}),

	new Product({
	imagePath: 'http://geeknation.com/wp-content/uploads/2013/01/supermangames_headerv1.jpg',
	title: 'Superman Video Game',
	description: 'really cool video game!!!',
	price: 15
	}),

	new Product({
	imagePath: 'https://lh3.googleusercontent.com/dObdVpkK4Ew-Vf397bbnTd2A9WhRxQwd4IkngovXJNWpnHtq3frvc1iCTxfhj892BWb6ot78fw=w640-h400-e365',
	title: 'Spiderman Video Game',
	description: 'Awesome Game!!!',
	price: 20
	}),

	new Product({
	imagePath: 'https://upload.wikimedia.org/wikipedia/en/d/d7/Forza_5_box_art.jpg',
	title: 'Forza Motorsport 5',
	description: 'The game ships with 200 cars from over 50 manufacturers[3] and 17 circuits including Spa, Bathurst, Yas Marina, and Circuit de la Sarthe. There will be monthly car packs including 10 cars each available to buy as downloadable content (DLC) for the first 8 months after the games launch. ',
	price: 50
	}),
];

var done =0;
for (var i=0; i < products.length; i++) {
	products[i].save(function (err, result) { done++; if (done == products.length) { exit(); } });
}

function exit()
{
mongoose.disconnect();
}
