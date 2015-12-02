var spotify = require('./../spotify_api.js');

module.exports = {

	loginToSpotify: function(req, res, next) {

		spotify.loginToSpotify(req, res);

	},

	loginToPlaylist: function(req, res, next) {},

	callback: function(req, res, next) {

		spotify.callback(req, res);
		res.send('logged in!!');

	},

	refreshToken: function(req, res, next) {

		spotify.refreshToken(req, res);

	},

};