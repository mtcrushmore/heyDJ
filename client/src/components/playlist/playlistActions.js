import { dispatch } from './../../dispatchers/appDispatcher';
import { playlistConstants } from './playlistConstants';

export const playlistActions = {
	
	createPlaylist (token, name) {
		$.post('playlist/createPlaylist', { token: token, name: name }, function(err, body) {
			if (err) console.log('Error creating a new playlist:', err);
			if (body) console.log(body);
		});
	},

};