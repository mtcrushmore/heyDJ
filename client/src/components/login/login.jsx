import * as React from 'react';
import { loginActions } from './loginActions';

export class Login extends React.Component {

	loginToSpotify () {
		loginActions.loginToSpotify();
	}

	render () {
		return (
			<div>

				<h1>Are You The DJ? (Spotify Premium Required)</h1>
				<a href='./user/loginToSpotify'>Log In To Spotify</a>

				<h1>Are You A Listener?</h1>
				<a href='user/loginToPlaylist' className='btn btn-primary'>Find Your Party</a>

			</div>
			)
	}

};