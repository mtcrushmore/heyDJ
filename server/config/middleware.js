module.exports = function(app, express) {

	var mainRouter = express.Router();
	var userRouter = express.Router();
	var roomRouter = express.Router();
	var playlistRouter = express.Router();

	app.use(express.static(__.dirname + './../../client'));
	// app.use(express.static(__.dirname + './../assets'));

	app.main('/main', mainRouter);
	app.use('/users', userRouter);
	app.use('/rooms', roomRouter);
	app.use('/playlists', playlistRouter);

	require('../main/mainRoute.js')(mainRouter);
	require('../users/userRoute.js')(userRouter);
	require('../rooms/roomRoute.js')(roomRouter);
	require('../playlists/playlistRoute.js')(playlistRouter);

};