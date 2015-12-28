'use strict';

const request = require('request');
const querystring = require('querystring');
const app = require('./server.js');
const keys = require('./keys.js');

const client_id = keys.spotify_client_id;
const client_secret = keys.spotify_client_secret;
const redirect_uri = 'http://localhost:3000/callback';

let access_token;
let refresh_token;
let user_id;
let playlist_id;

const generateRandomString = function(length) {
	let text = '';
	const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

	for (let i = 0; i < length; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	};
	return text;
};

const stateKey = 'spotify_auth_state';

module.exports = {

	loginToSpotify: function(req, res) {

		let state = generateRandomString(16);
		res.cookie(stateKey, state);

		const scope = 'user-read-private user-read-email playlist-modify-private playlist-modify-public';
		res.redirect('https://accounts.spotify.com/authorize?' +
			querystring.stringify({
				response_type: 'code',
				client_id: client_id,
				scope: scope,
				redirect_uri: redirect_uri,
				state: state,
			}));

	},

	callback: function(req, res, cb) {

		let authOptions;
		let code = req.query.code || null;
		let state = req.query.state || null;
		let storedState = req.cookies ? req.cookies[stateKey] : null;

		if (state === null || state !== storedState) {
			res.redirect('/#' +
				querystring.stringify({
					error: 'state_mismatch',
				}));
		} else {
			res.clearCookie(stateKey);
			authOptions = {
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
			let options;

			if (!err && res.statusCode === 200) {

				access_token = body.access_token;
				refresh_token = body.refresh_token;

				options = {
					url: 'https://api.spotify.com/v1/me',
					headers: {
						'Authorization': 'Bearer ' + access_token
					},
					json: true,
				};

				request.get(options, function(err, res, body) {
					user_id = body.id;
					
					let response = {
						user_id: body.id,
						access_token: access_token,
						refresh_token: refresh_token,
					};

					cb(response);
				});
			}
		});
	},

	refreshToken: function(req, res) {

		let refresh_token = req.query.refresh_token;
		let authOptions = {
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
				let access_token = body.access_token;
				res.send({
					'access_token': access_token,
				});
			}
		});

	},

	createPlaylist: function(req, res) {

		let params = {
			'name': 'New hey DJ Playlist!!',
			'public': false,
		};

		let options = {
			url: 'https://api.spotify.com/v1/users/' + user_id + '/playlists',
			body: JSON.stringify(params),
			dataType: 'json',
			headers: {
				'Authorization': 'Bearer ' + access_token,
				'Content-Type': 'application/json',
			},
		};

		request.post(options, function(err, response, body) {

			if (err) { 
				console.log(err);
			} else {
				body = JSON.parse(body);
				playlist_id = body.id;
				res.sendStatus(playlist_id);
			};

		});

	},

	getPlaylist: function(req, res) {

		let options = {
			url: 'https://api.spotify.com/v1/users/1261637495/playlists/1V6EjVyGhaGexesBtpXfQx/tracks',
			headers: {
				'Authorization': 'Bearer ' + access_token,
			},
			json: true,
		};

		request.get(options, function(err, response, body) {
			if (body['items']) {
				for (let i = 0; i < body['items'].length; i++) {
					console.log(body['items'][i]['track']);
					console.log(body['items'][i]['track']['artists'][0]['name']);
				}
				// console.log(body['items']);
			}
			// res.send(body);
		});

	},

	search: function(searchTerm, callback) {

		let params = {
			'q': searchTerm,
			'type': 'album,artist,track',
		};
		let options = {
			url: 'https://api.spotify.com/v1/search',
			qs: params,
			headers: {
				'Content-Type': 'application/json',
			},
			json: true,	
		};

		request.get(options, function(err, response, body) {
			if (err) { 
				console.log(err);
				console.log('error');
			} else {
				console.log('result from spotify', body);
				callback(body);
			};
		});
	},

	addSong: function(req, res) {
		//POST /v1/users/{user_id}/playlists/{playlist_id}/tracks/{spotify_track_uri}
		let options = {
			url: 'https://api.spotify.com/v1/users/' + user_id + '/playlists/' + playlist_id + '/tracks?uris=spotify:track:1SARbfnOIcuohWfh4pdLuC',
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
				console.log(body);
			};

		});

	},

	reorderPlaylist: function(req, res) {

		let range_start, insert_before;

		let options = {
			url: 'https://api.spotify.com/v1/users/1261637495/playlists/1V6EjVyGhaGexesBtpXfQx/tracks',
			headers: {
				'Authorization': 'Bearer ' + access_token,
				'Content-Type': 'application/json',
			},
			json: true,
			body: {
				'range_start': range_start,
				'insert_before': insert_before,
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

















