var socket = io();

//
// ─── RECIEVE DATA FROM SERVER ───────────────────────────────────────────────────
//

// names should match exactly with the emit name in index.js
socket.on('message', (message) => {
    console.log(message);
});

//
// ─── DATA TO THE SERVER ─────────────────────────────────────────────────────────
//


$("#message-form").submit(function (e) { 
    e.preventDefault();
    var message = $('input[name=message]').val();
    // Sending data to the server
    socket.emit("sendMessage", message);
    $('input[name=message]').val('');
});

//Share the location
$("#send-location").click(function (e) { 
    e.preventDefault();
    if (!navigator.geolocation) {
        return alert("Geolocation is not supported in your browser!")
    }

    navigator.geolocation.getCurrentPosition((position) => {
        var location = {
            lat : position.coords.latitude,
            long : position.coords.longitude
        }
        socket.emit('sendLocation', location);
    })
    
});

// ────────────────────────────────────────────────────────────────────────────────
