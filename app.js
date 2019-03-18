var http = require('http');
var fs = require('fs');

// Object associating client choosen IDs with their given IDs at the connexion
var clients = {};

// Loading index.html for the client
var server = http.createServer(function(req, res) {
    fs.readFile('./index.html', 'utf-8', function(error, content) {
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end(content);
    });
});

// Loading socket.io
var io = require('socket.io').listen(server);

io.sockets.on('connection', function (socket, id) {

    // When receiving an ID, we store it in the clients Object
    socket.on('identifiant', function(id) {
        console.log(socket.id);
        //socket.id = id;
        //console.log(io.sockets.connected);
        clients[id] = socket.id;
        console.log('id of new client : ', clients[id]);
        console.log(clients);
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

console.log("Starting server...")
server.listen(8080);
