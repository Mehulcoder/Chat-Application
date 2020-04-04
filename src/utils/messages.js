var generateMessage = (text) => {
    return {
        text,
        createdAt: new Date().getTime()
    }
}

var generateLocationMessage = (url) => {
    return{
        url,
        createdAt: new Date().getTime()
    }
}

module.exports = {
    generateMessage,
    generateLocationMessage
}