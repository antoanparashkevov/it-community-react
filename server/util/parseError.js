function parseError(error) {
    if(Array.isArray(error)) {
        return error.map(e => e.msg).join('\n')
    } else if(error.name === 'ValidationError') {//mongoose error
        return Object.values(error.errors).map(e=>e.message).join('\n');
    } else {
        return error.message
    }
}

module.exports = parseError