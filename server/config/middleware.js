module.exports = function(app, express) {

	var mainRouter = express.Router();
	var userRouter = express.Router();
	var roomRouter = express.Router();
	var playlistRouter = express.Router();

	app.use(express.static(__dirname + './../../dist'));

	app.use('/user', userRouter);
	app.use('/playlist', playlistRouter);

	require('../users/userRoutes.js')(userRouter);
	require('../playlists/playlistRoutes.js')(playlistRouter);

};