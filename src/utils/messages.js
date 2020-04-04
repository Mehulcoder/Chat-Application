//
// ─── MESSAGE FOR TEXT ───────────────────────────────────────────────────────────
//

var generateMessage = (text) => {
    return {
        text,
        createdAt: new Date().getTime()
    }
}

//
// ─── MESSAGE FOR LOCATION ───────────────────────────────────────────────────────
//

var generateLocationMessage = (url) => {
    return{
        url,
        createdAt: new Date().getTime()
    }
}

// ────────────────────────────────────────────────────────────────────────────────

module.exports = {
    generateMessage,
    generateLocationMessage
}