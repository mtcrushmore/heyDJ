var jwt = require('jsonwebtoken');
var Spotify = require('./../spotify_api.js');
var q = require('q');
var playlist = require('./playlistModel.js');

//todo: create user auth with token generated when room/passcode is created

module.exports = {

	createPlaylist: function(req, res, next) {

		Spotify.createPlaylist(req, res);

	},

	getPlaylist: function(req, res, next) {

		Spotify.getPlaylist(req, res);

	},

	search: function(req, res, next) {

		var searchTerm = 'James Brown';

		Spotify.search(searchTerm, function(results) {
			console.log('results from playlistCtrl:', results);
			res.sendStatus(201);
		});

	},

	addSong: function(req, res, next) {

		Spotify.addSong(req, res);
		// playlist.addSong(req, res);

	},

	reorderPlaylist: function(req, res, next) {

		Spotify.reorderPlaylist(req, res);

	},

	voteSong: function(req, res, next) {

		/* access playlist in mongoDB, then check if 
		rank has changed, if so, change in DB, change in Spotify */
		/* parameter will include up or down */
		//changeRank will be a recursive function
		// Spotify.voteSong(req, res);

	},

	// changeRank: function(req, res, next) {},

};