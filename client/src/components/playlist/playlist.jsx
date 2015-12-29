import * as React from 'react';
import { playlistActions } from './playlistActions';
import { CreatePlayList } from './createPlaylist';

export class PlayList extends React.Component {

	/* Views: playlist name/location
				search/add song
				playlist tracks
					track details
					track voting
					*/

	render () {
		return (
			<div>
				<CreatePlayList token={ this.props.token } />
			</div>
			)
	}

};