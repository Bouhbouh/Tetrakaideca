var http = require('http');
var fs = require('fs');

// Object associating client choosen IDs with their given IDs at the connexion
var clients = {};

// Setting express and socket.io
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

// Using static files
app.use(express.static(__dirname + '/node_modules'));
app.use(express.static(__dirname + '/videos'));
app.use(express.static(__dirname + '/images'));
app.use(express.static(__dirname + '/sound'));
app.use(express.static(__dirname + '/style'));

// Routing
app.get('/', function(req, res, next) {
    res.sendFile(__dirname + '/index.html');
});
app.get('/phone', function(req, res, next) {
    res.sendFile(__dirname + '/phone.html')
});

io.sockets.on('connection', function (socket, id) {

    // When receiving an ID, we store it in the clients Object
    socket.on('identifiant', function(id) {
        console.log(socket.id);
        clients[id] = socket.id;
        console.log('id of new client : ', clients[id]);
        console.log(clients);
    });

    socket.on('choosedVideo', function(id, video) {
        console.log(id + ' choosed : ' + video);
        io.sockets.to(clients[0]).emit('choosedVideo', id, video);
    });

    socket.on('playVideo', function(id, time) {
        console.log('request to play video of : ' + id);
        io.sockets.to(clients[id]).emit('playVideo', time);
    });

    // Sending the message to the correct client
    socket.on('messageFrom', function (id, message) {
        console.log(id + ' says ' + message);
        io.sockets.to(socket.id).emit('messageFrom', id, message);
    });

    // Receiving a message to send to someone
    socket.on('messageTo', function (id, message) {
        console.log(socket.id + ' wants to send a message to ' + id);
        // We send the message to the correct client
        io.sockets.to(clients[id]).emit('messageFrom', id, message);
    });
});

console.log('Starting server...');
server.listen(8080);
