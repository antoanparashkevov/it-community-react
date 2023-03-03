const {Schema, model} = require('mongoose')


const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    hashedPassword:{
        type: String,
        required: true
    }
})
userSchema.index({email: 1}/*asc order*/, {
    collation: {
        locale: 'en',//english letters only
        strength: 2 //case insensitive
    }
})
const User = model('User', userSchema)

module.exports = User