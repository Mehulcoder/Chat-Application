//
// ─────────────────────────────────────────────── TO KEEP TRACK OF THE USERS ─────
//

users = [];

//
// ─── ADD USER ───────────────────────────────────────────────────────────────────
//

var addUser = ({id, username, room}) => {

    //Clean the data
    username = username.trim().toLowerCase();
    room = room.trim().toLowerCase();

    //Validate the data
    if (!username || !room) {
        return {
            error:"Username and room are required"
        }
    }

    //Check for existing user
    var existingUser = users.find((user) => {
        return (user.room === room && user.username === username)
    })

    //Validate Username
    if (existingUser) {
        return {
            error:"Username in use"
        }
    }
    
    //Store user
    var user = {id, username, room};
    users.push(user);
    return {user};
}

//
// ─── REMOVE USER BY ID ──────────────────────────────────────────────────────────
//

var removeUser = (id) => {
    var index = users.findIndex((user) => {
        return user.id === id
    });

    if (index != -1) {
        return users.splice(index, 1)[0];
    }
}

//
// ─── GET USER ───────────────────────────────────────────────────────────────────
//

var getUser = (id) => {
    return users.find((user) => user.id === id)
}

//
// ─── GET USER LIST IN A ROOM ────────────────────────────────────────────────────
//


var getUsersInRoom = (room) => {
    return users.filter((user) => user.room === room);
}

// ────────────────────────────────────────────────────────────────────────────────

module.exports = {
    getUser,
    getUsersInRoom,
    removeUser,
    addUser
}


