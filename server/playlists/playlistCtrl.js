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

	upvoteSong: function(req, res, next) {

		/* access playlist in mongoDB, then check if 
		rank has changed, if so, change in DB, change in Spotify */
		//changeRank will be a recursive function

	},

	downvoteSong: function(req, res, next) {},

	changeRank: function(req, res, next) {},

};