var socket = io();

//
// ─── TEMPLATES ──────────────────────────────────────────────────────────────────
//

var messageTemplate = $('#message-template').html();
var locationMessageTemplate = $('#location-message-template').html();

//
// ─── RECIEVE DATA FROM SERVER ───────────────────────────────────────────────────
//

//Location message
socket.on('locationMessage', (url) => {
    console.log("Location: ", url);
    //Render the template as the message is recieved 
    var html = Mustache.render(locationMessageTemplate,{
        url 
    });
    $('#messages').append(html);
})

// Normal message
socket.on('message', (message) => {
    console.log(message);
    
    //Render the template as the message is recieved 
    var html = Mustache.render(messageTemplate,{
        message
    });
    $('#messages').append(html);
});

//
// ─────────────────────────────────────────────────────── DATA TO THE SERVER ─────
//

//
// ─── PRINTING MESSAGE ───────────────────────────────────────────────────────────
//

$("#message-form").submit(function (e) { 
    e.preventDefault();
    var message = $('input[name=message]').val();

    // Sending data to the server
    socket.emit("sendMessage", message, (error) => {

        //If error is there
        if (error) {
            return console.log(error);
        }

        //Success
        console.log("Message has been delivered!")
    }); 

    $('input[name=message]').val('');
    $('input[name=message').focus();

});

//
// ─── SHARE THE LOCATION ─────────────────────────────────────────────────────────
//

$("#send-location").click(function (e) { 
    e.preventDefault();
    if (!navigator.geolocation) {
        return alert("Geolocation is not supported in your browser!")
    }

    //disable
    $("#send-location").attr('disabled', 'disabled');
    
    navigator.geolocation.getCurrentPosition((position) => {
        var location = {
            lat : position.coords.latitude,
            long : position.coords.longitude
        }
        socket.emit('sendLocation', location, (status) => {
            console.log(status);
        });
    });

    //enable
    $("#send-location").removeAttr('disabled');

    
});

// ────────────────────────────────────────────────────────────────────────────────
