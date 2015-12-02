var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');

var sockets = require('./socket_server.js');
var middleware = require('./config/middleware.js');
var user = require('./users/userCtrl.js');

var app = express();
var server = http.createServer(app);

var port = 3000;

mongoose.connect('mongodb://localhost/local', function(error) {
	if (error) { console.log('mongodb error:', error); }
	else { console.log('mongo connected'); };
})

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/callback', user.callback);

middleware(app, express);

sockets(server);

server.listen(port, function() {
	console.log('Listening on ' + server.address().port);
});

module.exports = app;

