import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BabelTest } from './babel-test';

const MainView = React.createClass({

	getInitialState: function() {
		return {
			userType: null,
		};
	},

	render: function() {

		return (
			<div>
				<h1> hey DJ! </h1>
				<a href='user/loginToSpotify' className='btn btn-primary'>Log In To Spotify</a>
				<BabelTest />
			</div>
			)
	},

});

ReactDOM.render(<MainView />, document.getElementById('container'));