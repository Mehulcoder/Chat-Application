var express = require('express');
var request = require('request');
var socketio = require('socket.io');
var Filter = require('bad-words');
var http = require('http');
var path = require('path');

// ────────────────────────────────────────────────────────────────────────────────

var app = express();
//Manually create server for support in socketio
var server = http.createServer(app);
var io = socketio(server);

var port = 3000 || process.env.PORT;

var publicDirectoryPath = path.join(__dirname,'../public');
app.use(express.static(publicDirectoryPath));

//
// ─── ON CONNECTION ──────────────────────────────────────────────────────────────
//

io.on('connection', (socket)=>{
    console.log('A user connected');
    socket.broadcast.emit('message','A new user has joined!')
    // Send data to the client
    socket.emit('message','Welcome to the application');

    // Message is recieved
    socket.on('sendMessage', (message, callback) => {
        //Check Bad Language
        var filter = new Filter();
        if (filter.isProfane(message)) {
            return callback("Profanity is not allowed");
        }

        //emit to all the clients
        io.emit('message', message);
        //When message is emmited to all the clients by the server. Send this to sender client
        callback()
    });

    //when the client gets disconnected
    socket.on('disconnect',() => {
        io.emit('message', "User has left");
    })

    //when client sends location
    socket.on('sendLocation', (location, status) => {
        socket.broadcast.emit('locationMessage',`https://google.com/maps?q=${location.lat},${location.long}`);
        status("Location has been shared!");
    })
});

//
// ─── LISTEN TO HTTP SERVER ──────────────────────────────────────────────────────
//

server.listen(port, () => {
    console.log("Server is listening to port "+port);
})