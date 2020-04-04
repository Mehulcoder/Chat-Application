var socket = io();

//
// ─── RECIEVE DATA FROM SERVER ───────────────────────────────────────────────────
//

// names should match exactly with the emit name in index.js
socket.on('countUpdated', (count) => {
    
    console.log("Count has been updated!", count);
});

//
// ─── DATA TO THE SERVER ─────────────────────────────────────────────────────────
//

$("#increment").click(function (e) { 
    e.preventDefault();
    // Sending data to the server
    socket.emit("increment");
})



// ────────────────────────────────────────────────────────────────────────────────
