var request = require('request');
var querystring = require('querystring');
var app = require('./server.js');
var keys = require('./keys.js');

var client_id = keys.spotify_client_id;
var client_secret = keys.spotify_client_secret;
var redirect_uri = 'http://localhost:3000/callback';

var access_token;
var refresh_token;

var generateRandomString = function(length) {
	var text = '';
	var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

	for (var i = 0; i < length; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	};
	return text;
};

var stateKey = 'spotify_auth_state';

module.exports = {

	loginToSpotify: function(req, res) {

		var state = generateRandomString(16);
		res.cookie(stateKey, state);

		var scope = 'user-read-private user-read-email playlist-modify-private playlist-modify-public';
		res.redirect('https://accounts.spotify.com/authorize?' +
			querystring.stringify({
				response_type: 'code',
				client_id: client_id,
				scope: scope,
				redirect_uri: redirect_uri,
				state: state,
			}));

	},

	callback: function(req, res) {

		var code = req.query.code || null;
		var state = req.query.state || null;
		var storedState = req.cookies ? req.cookies[stateKey] : null;

		if (state === null || state !== storedState) {
			res.redirect('/#' +
				querystring.stringify({
					error: 'state_mismatch',
				}));
		} else {
			res.clearCookie(stateKey);
			var authOptions = {
				url: 'https://accounts.spotify.com/api/token',
				form: {
					code: code,
					redirect_uri: redirect_uri,
					grant_type: 'authorization_code',
				},
				headers: {
					'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')),
				},
				json: true,
			};
		};

		request.post(authOptions, function(err, res, body) {
			if (!err && res.statusCode === 200) {

				access_token = body.access_token;
				refresh_token = body.refresh_token;

				var options = {
					url: 'https://api.spotify.com/v1/me',
					headers: {
						'Authorization': 'Bearer ' + access_token
					},
					json: true,
				};

				request.get(options, function(err, res, body) {
					console.log(body);
				});
			}
		});
	},

	refreshToken: function(req, res) {

		var refresh_token = req.query.refresh_token;
		var authOptions = {
			url: 'https://accounts.spotify.com/api/token',
			headers: {
				'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')), 
			},
			form: {
				grant_type: 'refresh_token',
				refresh_token: refresh_token,
			},
			json: true,
		};

		request.post(authOptions, function(err, res, body) {
			if (!err && response.statusCode === 200) {
				var access_token = body.access_token;
				res.send({
					'access_token': access_token,
				});
			}
		});

	},

	createPlaylist: function(req, res) {},

	getPlaylist: function(req, res) {

		var options = {
			url: 'https://api.spotify.com/v1/users/1261637495/playlists/1V6EjVyGhaGexesBtpXfQx/tracks',
			headers: {
				'Authorization': 'Bearer ' + access_token,
			},
			json: true,
		};

		request.get(options, function(err, response, body) {
			if (body['items']) {
				for (var i = 0; i < body['items'].length; i++) {
					console.log(body['items'][i]['track']);
					console.log(body['items'][i]['track']['artists'][0]['name']);
				}
				// console.log(body['items']);
			}
			// res.send(body);
		});

	},

	addSong: function(req, res) {
		//POST /v1/users/{user_id}/playlists/{playlist_id}/tracks/{spotify_track_uri}
		var options = {
			url: 'https://api.spotify.com/v1/users/1261637495/playlists/1V6EjVyGhaGexesBtpXfQx/tracks?uris=spotify:track:1SARbfnOIcuohWfh4pdLuC',
			headers: {
				'Authorization': 'Bearer ' + access_token,
				'Content-Type': 'application/json',
			},
			json: true,
		};

		request.post(options, function(err, response, body) {

			if (err) { 
				console.log(err);
				console.log('error');
			} else {
				res.sendStatus(201);
			};

		});

	},

	reorderPlaylist: function(req, res) {

		var options = {
			url: 'https://api.spotify.com/v1/users/1261637495/playlists/1V6EjVyGhaGexesBtpXfQx/tracks',
			headers: {
				'Authorization': 'Bearer ' + access_token,
				'Content-Type': 'application/json',
			},
			json: true,
			body: {
				'range_start': 3,
				'insert_before': 0,
			},
		};

		request.put(options, function(err, response, body) {
			if (err) { 
				console.log(err);
				console.log('error');
			} else {
				res.sendStatus(201);
			};
		});

	},

};

















