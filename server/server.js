var express = require('express');
var http = require('http');
var sockets = require('./socket_server.js');
var middleware = require('./config/middleware.js');

var app = express();
var server = http.createServer(app);

var port = 3000;

middleware(app, express);

sockets(server);

server.listen(port, function() {
	console.log('Listening on ' + server.address().port);
});

module.exports = app;

