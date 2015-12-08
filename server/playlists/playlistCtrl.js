var jwt = require('jsonwebtoken');
var spotify = require('./../spotify_api.js');
var q = require('q');
var playlist = require('./playlistModel.js');

//todo: create user auth with token generated when room/passcode is created

module.exports = {

	createPlaylist: function(req, res, next) {},

	getPlaylist: function(req, res, next) {

		spotify.getPlaylist(req, res);

	},

	addSong: function(req, res, next) {

		spotify.addSong(req, res);
		// playlist.addSong(req, res);

	},

	voteSong: function(req, res, next) {

		/* access playlist in mongoDB, then check if 
		rank has changed, if so, change in DB, change in Spotify */
		/* parameter will include up or down */
		//changeRank will be a recursive function
		// spotify.voteSong(req, res);

	},

	// changeRank: function(req, res, next) {},

};