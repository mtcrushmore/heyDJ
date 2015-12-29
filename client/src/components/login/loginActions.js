import { dispatch } from './../../dispatchers/appDispatcher';
import { loginConstants } from './loginConstants';

export const loginActions = {
	
	loginToSpotify () {

		$.get('/user/loginToSpotify', function(err, data) {
			if (err) console.log('Error logging into Spotify:', err);
			if (data) console.log(data);
		});

	},

	loginToPlaylist (loginInfo) {
		dispatch(loginConstants.login_to_playlist, loginInfo);
	},

};
