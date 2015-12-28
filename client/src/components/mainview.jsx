import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Login } from './login/login';

class MainView extends React.Component {

	constructor (props) {
		super(props);
		this.state = {
			userType: null,
			loggedIn: false,
		};
	}

	render () {

		return (
			<div>
				<h1> hey DJ! </h1>

				{ !this.state.loggedIn ? <Login /> : null }

			</div>
			)
	}

};

ReactDOM.render(<MainView />, document.getElementById('container'));