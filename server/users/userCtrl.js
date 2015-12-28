var spotify = require('./../spotify_api.js');

module.exports = {

	loginToSpotify: function(req, res, next) {

		spotify.loginToSpotify(req, res);

	},

	loginToPlaylist: function(req, res, next) {



	},

	authenticateUser: function(req, res, next) {

		console.log('authenticating user ...');

		next();

	},

	callback: function(req, res, next) {

		spotify.callback(req, res, function(response) {
			console.log(response);
			res.redirect('/');
		});

	},

	refreshToken: function(req, res, next) {

		spotify.refreshToken(req, res);

	},

};