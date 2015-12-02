var userCtrl = require('./userCtrl.js');
var app = require('./../server.js');

module.exports = function(app) {

	app.get('/loginToSpotify', userCtrl.loginToSpotify);
	app.get('/loginToPlaylist', userCtrl.loginToPlaylist);

	// app.get('/callback', userCtrl.callback);

};