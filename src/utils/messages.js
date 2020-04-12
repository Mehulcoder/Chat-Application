//
// ─── MESSAGE FOR TEXT ───────────────────────────────────────────────────────────
//

var generateMessage = (username, text) => {
    return {
        username,
        text,
        createdAt: new Date().getTime()
    }
}

//
// ─── MESSAGE FOR LOCATION ───────────────────────────────────────────────────────
//

var generateLocationMessage = (username, url) => {
    return{
        username, 
        url,
        createdAt: new Date().getTime()
    }
}

// ────────────────────────────────────────────────────────────────────────────────

module.exports = {
    generateMessage,
    generateLocationMessage
}