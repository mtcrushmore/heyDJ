import * as React from 'react';

export class Login extends React.Component {

	render () {
		return (
			<div>

				<h1>Are You The DJ? (Spotify Premium Required)</h1>
				<a href='user/loginToSpotify' className='btn btn-primary'>Log In To Spotify</a>

				<h1>Are You A Listener?</h1>
				<a href='user/loginToPlaylist' className='btn btn-primary'>Find Your Party</a>

			</div>
			)
	}

};