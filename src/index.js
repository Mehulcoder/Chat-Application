var express = require('express');
var request = require('request');
var socketio = require('socket.io');
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

    //message is recieved
    socket.on('sendMessage', (message) => {
        //emit to all the clients
        io.emit('message', message);
    })

    //when the client gets disconnected
    socket.on('disconnect',() => {
        io.emit('message', "User has left");
    })

    //when client sends location
    socket.on('sendLocation', (location) => {
        console.log(location)
        socket.broadcast.emit('message',`https://google.com/maps?q=${location.lat},${location.long}`);
    })
});


//
// ─── LISTEN TO HTTP SERVER ──────────────────────────────────────────────────────
//

server.listen(port, () => {
    console.log("Server is listening to port "+port);
})