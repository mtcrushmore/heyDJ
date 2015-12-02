module.exports = function(app, express) {

	var mainRouter = express.Router();
	var userRouter = express.Router();
	var roomRouter = express.Router();
	var playlistRouter = express.Router();

	app.use(express.static(__dirname + './../../client'));
	// app.use(express.static(__dirname + './../assets'));

	// app.main('/main', mainRouter);
	app.use('/user', userRouter);
	// app.use('/rooms', roomRouter);
	app.use('/playlist', playlistRouter);

	// require('../main/mainRoutes.js')(mainRouter);
	require('../users/userRoutes.js')(userRouter);
	// require('../rooms/roomRoutes.js')(roomRouter);
	require('../playlists/playlistRoutes.js')(playlistRouter);

};