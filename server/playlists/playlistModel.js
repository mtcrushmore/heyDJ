//need playlistDB (mySQL?) with reference to songs and vote totals
//song is added & appended to playlist with vote total of 0
	//spotify called to addSong
//upvote/downvote will be incremented/decremented in mongo
	//if it outranks next song, it will shift them in spotify playlist
	//this will be a recursive function (until it is properly ranked)

var mongoose = require('mongoose');

var PlaylistSchema = new mongoose.Schema({
	user_id: {
		type: Number,
		required: true,
		unique: true
	},
	playlist_id: {
		type: String,
		required: true,
		unique: true
	},
	playlist_name: String,
	tracks: {
		type: {},
		/* { 'rank#': {
			id,
			voteTotal,
			artistName,
			albumTitle,
			albumImg,
			songTitle,
		}} */
	},
});

module.exports = mongoose.model('Playlist', PlaylistSchema);