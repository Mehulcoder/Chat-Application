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

var count = 0;

io.on('connection', (socket)=>{
    console.log('a user connected');
    // Send data to the client
    socket.emit('countUpdated', count);

    socket.on('increment',() => {
        count++;
        // Send the data again to the ALL the client(broadcast)
        io.emit('countUpdated', count);
    })
});


//
// ─── LISTEN TO HTTP SERVER ──────────────────────────────────────────────────────
//

server.listen(port, () => {
    console.log("Server is listening to port "+port);
})