import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Login } from './login/login';

class MainView extends React.Component {

	/* In ES6, this constructor function is used in place of setInitialState 
	(as we are working with Component Classes). */
	constructor (props) {
		super(props);
		this.state = {
			userType: null,
			loggedIn: false,
		};
	}

	/* When logged into Spotify, access_token and refresh_token will both be present in the url parameters.
	This function determines those for user auth and future Spotify calls from the client. */
	getHashParams () {
		var hashParams = {};
		var e, r = /([^&;=]+)=?([^&;]*)/g,
		    q = window.location.hash.substring(1);
		while ( e = r.exec(q)) {
		   hashParams[e[1]] = decodeURIComponent(e[2]);
		}
		return hashParams;
	}

	/* If client is logged into Spotify, the access_token will be present in the URL. If so, the state will be
	changed to indicate that the client is logged in as the DJ. */
	componentWillMount () {
		if (this.getHashParams().access_token) {
			this.setState({
				userType: 'spotifyDJ',
				loggedIn: true,
			})
		};
	}

	render () {
		return (
			<div>
				<h1> hey DJ! </h1>
				{ !this.state.loggedIn ? <Login loggedIn={ this.state.loggedIn } /> : null }
			</div>
			)
	}
};

ReactDOM.render(<MainView />, document.getElementById('container'));