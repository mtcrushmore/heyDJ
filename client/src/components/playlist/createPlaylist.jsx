import * as React from 'react';
import { playlistActions } from './playlistActions';

export class CreatePlayList extends React.Component {

	constructor (props) {
		super(props);
		this.enterPressed = this.enterPressed.bind(this);
		this.createPlaylist = this.createPlaylist.bind(this);
	}

	enterPressed (event) {
		if (event.keyCode === 13) this.createPlaylist();
	} 

	createPlaylist () {
		let newPlaylistName = document.getElementById('createPlaylist').value;
		playlistActions.createPlaylist(this.props.token, newPlaylistName);
	}

	render () {
		return (
			<div>
				<input id='createPlaylist' type='text' onKeyDown={ this.enterPressed } />
				<input type='button' onClick={ this.createPlaylist } value='Create A Playlist' />
			</div>
			)
	}

};