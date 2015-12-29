var gulp = require('gulp');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var reactify = require('reactify');

var nodemon = require('gulp-nodemon');

var path = {
	HTML:'./client/index.html',
	MINIFIED_OUT: 'build.min.js',
	OUT: 'build.js',
	DEST: 'dist',
	DEST_BUILD: 'dist/build',
	DEST_SRC: 'dist/src',
	ENTRY_POINT: './client/src/components/mainview.jsx'
};

gulp.task('copy', function() {
	gulp.src(path.HTML)
		.pipe(gulp.dest(path.DEST));
});

gulp.task('build', function() {
	return browserify({ 
		entries: path.ENTRY_POINT, 
		extensions: ['.jsx'],
		debug: true,
	})
		.transform('babelify', { presets: ['es2015', 'react' ]})
		.bundle()
		.pipe(source(path.OUT))
		.pipe(gulp.dest(path.DEST_SRC));
});

gulp.task('watch', ['build'], function() {
	gulp.watch('client/src/components/**/*.{ js, jsx }', ['build']);
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

gulp.task('default', ['copy', 'build', 'watch', 'nodemon']);

gulp.task('production', ['copy', 'build', 'finished']);











