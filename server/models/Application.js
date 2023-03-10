const {Schema, model} = require('mongoose')


const applicationSchema = new Schema({
    fullName: {
        type: String,
        minLength: [5, 'Please type your full first and last names!'],
        maxLength: [30, 'The restriction is 30 characters for your full name!'],
        required: true  
    },
    email: {
        type: String,
        required: true,
    },
    message:{
        type: String,
        minLength: [20, 'The message must be at least 20 characters long'],
        required: true
    },
    userId: {
        type: String,
        required: true
    }
})

const Application = model('Application', applicationSchema)

module.exports = Application