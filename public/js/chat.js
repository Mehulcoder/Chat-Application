var socket = io();

//
// ─── RECIEVE DATA FROM SERVER ───────────────────────────────────────────────────
//

// names should match exactly with the emit name in index.js
socket.on('message', (message) => {
    console.log(message);
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
    // $("#send-location").attr('disabled', 'disabled');

    
});

// ────────────────────────────────────────────────────────────────────────────────
