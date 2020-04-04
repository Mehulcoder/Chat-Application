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



// ────────────────────────────────────────────────────────────────────────────────
