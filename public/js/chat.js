
var socket = io();

//
// ─── TEMPLATES ──────────────────────────────────────────────────────────────────
//

var messageTemplate = $('#message-template').html();
var locationMessageTemplate = $('#location-message-template').html();
var sidebarTemplate = $('#sidebar-template').html();

//
// ─── OPTIONS ────────────────────────────────────────────────────────────────────
//
//Take from the url
var {username, room} = Qs.parse(location.search, {ignoreQueryPrefix: true});

//
// ─── AUTOSCROLL FUNCTION ────────────────────────────────────────────────────────
//

var autoscroll = () => {
    const $messages = document.querySelector('#messages')
    // New message element
    const $newMessage = $messages.lastElementChild

    // Height of the new message
    const newMessageStyles = getComputedStyle($newMessage)
    const newMessageMargin = parseInt(newMessageStyles.marginBottom)
    const newMessageHeight = $newMessage.offsetHeight + newMessageMargin

    // Visible height
    const visibleHeight = $messages.offsetHeight

    // Height of messages container
    const containerHeight = $messages.scrollHeight

    // How far have I scrolled?
    const scrollOffset = $messages.scrollTop + visibleHeight

    if (containerHeight - newMessageHeight <= scrollOffset) {
        $messages.scrollTop = $messages.scrollHeight
    }

}

//
// ─── RECIEVE DATA FROM SERVER ───────────────────────────────────────────────────
//

//Location message
socket.on('locationMessage', (url) => {
    //Render the template as the message is recieved 
    var html = Mustache.render(locationMessageTemplate,{
        username:url.username,
        url:url.text,
        createdAt:moment(url.createdAt).format('h:mm a')
    });
    $('#messages').append(html);

    autoscroll()
})

// Normal message
socket.on('message', (message) => {
    //Render the template as the message is recieved 
    var html = Mustache.render(messageTemplate,{
        username:message.username,
        message: message.text,
        createdAt: moment(message.createdAt).format('h:mm a')
    });
    $('#messages').append(html);

    autoscroll()

});

//Getting room data on update
socket.on('roomData', ({room, users})=>{
    var html = Mustache.render(sidebarTemplate,{
        room,
        users
    });

    $('#sidebar').html(html);
    // $('#sidebar').append(html);
})


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

//
// ─── SHARING THE USERNAME AND ROOMNAME ──────────────────────────────────────────
//

socket.emit('join', {username, room}, (error) => {
    if (error) {
        alert(error);
        location.href = '/'
    }
});


// ────────────────────────────────────────────────────────────────────────────────
