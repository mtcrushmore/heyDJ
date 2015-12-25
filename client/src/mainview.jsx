var React = require('react');
var ReactDOM = require('react-dom');

var MainView = React.createClass({

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
			</div>
			)
	},

});

ReactDOM.render(<MainView />, document.getElementById('container'));