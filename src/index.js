var express = require('express');
var request = require('request');
var path = require('path');
var port = 3000 || process.env.PORT;

var app = express();
var publicDirectoryPath = path.join(__dirname,'../public');

app.use(express.static(publicDirectoryPath));

app.get('/',(req, res) => {
    res.render('index');
})

app.listen(port, () => {
    console.log("Server is listening to port "+port);
})