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

io.on('connection', ()=>{
    console.log('a user connected');
});


//
// ─── LISTEN TO HTTP SERVER ──────────────────────────────────────────────────────
//

server.listen(port, () => {
    console.log("Server is listening to port "+port);
})