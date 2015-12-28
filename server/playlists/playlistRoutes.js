var playlistCtrl = require('./playlistCtrl.js');
var userCtrl = require('./../users/userCtrl.js');

module.exports = function(app) {

	app.all('/', userCtrl.authenticateUser);
	app.post('/createPlaylist', playlistCtrl.createPlaylist);
	app.get('/getPlaylist', playlistCtrl.getPlaylist);
	app.get('/search', playlistCtrl.search);
	app.post('/addSong', playlistCtrl.addSong);
	app.post('/voteSong', playlistCtrl.voteSong);
	app.put('/reorderPlaylist', playlistCtrl.reorderPlaylist);
	// app.post('/downvoteSong', playlistCtrl.downvoteSong);

};