var playlistCtrl = require('./playlistCtrl.js');

module.exports = function(app) {

	app.post('/createPlaylist', playlistCtrl.createPlaylist);
	app.get('/getPlaylist', playlistCtrl.getPlaylist);
	app.post('/addSong', playlistCtrl.addSong);
	app.post('/voteSong', playlistCtrl.voteSong);
	app.put('/reorderPlaylist', playlistCtrl.reorderPlaylist);
	// app.post('/downvoteSong', playlistCtrl.downvoteSong);

};