function parseError(error) {
    if(Array.isArray(error)) {
        return error.map(e => e.msg).join('\n')
        
    } else if(error.name === 'ValidationError') {//mongoose error
        return Object.values(error.errors).map(e=>e.message).join('\n');
        
    } else if(error.name === 'MongoServerError') {
        
        if( error.code === 11000 ) {//property field already exists
            return 'The property field ' + Object.values(error.keyValue) + ' already exists!'
            
        }
    } else {
        
        return error.message
    }
}

module.exports = parseError