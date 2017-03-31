var express = require('express'),
    app = express(),
    bp = require('body-parser'),
    port = 8000,
    session = require('express-session'),
    path = require('path');

app.use(bp.json());
app.use(express.static(path.join(__dirname, './bower_components')));
app.use(express.static(path.join(__dirname, './client')));
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
require(path.join(__dirname, './server/config/mongoose.js'));
require(path.join(__dirname, './server/config/routes.js'))(app);


var server = app.listen(port, function(err) {
    if (err) {
        console.log(err);
    } else {
        console.log('Listening on port ' + port);
    }
});


var io = require('socket.io').listen(server);
var pubsub = require('./server/config/pubsub');

io.sockets.on('connection', function (socket) {
	console.log( "WE ARE USING SOCKETS!", socket.id );

	// console.log(io.sockets);


	socket.on( "page_load", function ( data ) {
		// console.log( data.user );
		//console.log(socket.id / data.user.name + " navigated to page " + data.location.pathname + data.location.hash );
		// socket.broadcast.emit('reader', data);
		pubsub.publish( socket, data );
	} );

});
