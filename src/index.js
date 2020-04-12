var express = require('express');
var request = require('request');
var socketio = require('socket.io');
var Filter = require('bad-words');
var qs = require('query-string');
var http = require('http');
var path = require('path');
var {generateMessage, generateLocationMessage} = require('./utils/messages');
var { getUser, getUsersInRoom, removeUser, addUser} = require('./utils/users');

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

    //Someone joins the application
    socket.on('join',(options, callback) => {
        
        //Add the user to the room
        var {error, user} = addUser({id:socket.id, ...options});
        if (error) {
            return callback(error);
        }

        //Allows us to join a room //user.room ---> trimmed and lowercased
        socket.join(user.room);
        
        // Send data to the client
        socket.emit('message',generateMessage('Welcome to the application'));
        socket.broadcast.to(user.room).emit('message',generateMessage(`${user.username} has joined!`));

        callback();

    })

    // Message is recieved
    socket.on('sendMessage', (message, callback) => {
        //Check Bad Language
        var filter = new Filter();
        if (filter.isProfane(message)) {
            return callback("Profanity is not allowed");
        }

        //emit to all the clients
        io.emit('message', generateMessage(message));
        //When message is emmited to all the clients by the server. Send this to sender client
        callback()
    });

    //when client sends location
    socket.on('sendLocation', (location, status) => {
        socket.broadcast.emit('locationMessage',generateLocationMessage(`https://google.com/maps?q=${location.lat},${location.long}`));
        status("Location has been shared!");
    });

    //when the client gets disconnected
    socket.on('disconnect',() => {
        io.emit('message', generateMessage("User has left"));
    });
});

//
// ─── LISTEN TO HTTP SERVER ──────────────────────────────────────────────────────
//

server.listen(port, () => {
    console.log("Server is listening to port "+port);
})