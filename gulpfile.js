var gulp = require('gulp');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');
var reactify = require('reactify');
var streamify = require('streamify');

var nodemon = require('gulp-nodemon');

var path = {
	HTML:'./client/index.html',
	MINIFIED_OUT: 'build.min.js',
	OUT: 'build.js',
	DEST: 'dist',
	DEST_BUILD: 'dist/build',
	DEST_SRC: 'dist/src',
	ENTRY_POINT: './client/src/mainview.jsx'
};

gulp.task('watch', function() {

	gulp.watch(path.HTML, ['copy']);

	var watcher = watchify(browserify({
		entries: [path.ENTRY_POINT],
		transform: [reactify],
		debug: true,
		cache: {}, packageCache: {}, fullPaths: true,
	}));

	return watcher.on('update', function() {
		watcher.bundle()
			.pipe(source(path.MINIFIED_OUT))
			.pipe(gulp.dest(path.DEST_BUILD))
			console.log('Updated Min Source Build');
		})
		// .bundle()
		// .pipe(source(path.MINIFIED_OUT))
		// .pipe(streamify(uglify(path.MINIFIED_OUT)))
		// .pipe(gulp.dest(path.DEST_BUILD))
});

gulp.task('build', function() {
	browserify({
		entries: [path.ENTRY_POINT],
		transform: [reactify]
	})
	.bundle()
	.pipe(source(path.MINIFIED_OUT))
	// .pipe(streamify(uglify(path.MINIFIED_OUT)))
	.pipe(gulp.dest(path.DEST_BUILD))

	browserify({
	  entries: [path.ENTRY_POINT],
	  transform: [reactify]
	})
	.bundle()
	.pipe(source(path.OUT))
	.pipe(gulp.dest(path.DEST_SRC))
});

gulp.task('nodemon', function() {
	nodemon({
		script: './server/server.js',
		ext: 'js',
		env: {'NODE_ENV': 'development'}
	})
	.on('start', function() {
		console.log('Server started!');
	})
	.on('restart', function() {
		console.log('Server restarted!');
	});
});

gulp.task('finished', function() {
	console.log('Production code was successfully built.')
});

gulp.task('default', ['copy', 'watch', 'nodemon']);

gulp.task('production', ['copy', 'build', 'finished']);











