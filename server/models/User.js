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
    },
    companyName: {
        type: String,
        minLength: [5, 'Please user more characters for your company name!'],
        maxLength: [30, 'You typed a very long company name! The restriction is 30 characters!'],
        required: true
    },
    desc: {
        type: String,
        min: [20, 'The description must be at least 20 characters long! Try to describe yourself as good as possible!'],
        max: [70, 'You reached the maximum characters for the description (70 characters)!'],
        required: true
    },
    foundationYear: {
        type: Number,
        min: [1900, 'The foundationYear must be a valid number between 1900 - 2023'],
        max: [2023, 'The foundationYear must be a valid number between 1900 - 2023'],
        required: true
    },
    roles: {
        type: [String],
        default: ['user']//it can be either a user or a company
    },
})

userSchema.index({email: 1}/*asc order*/, {
    collation: {
        locale: 'en',//english letters only
        strength: 2 //case insensitive
    }
})

const User = model('User', userSchema)

module.exports = User