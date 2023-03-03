const {Schema, model} = require('mongoose')


const applicationSchema = new Schema({
    fullName: {
        type: String,
        required: true  
    },
    email: {
        type: String,
        required: true,
    },
    message:{
        type: String,
        min: [20, 'The message must be at least 20 characters long'],
        required: true
    },
    userId: {
        type: String,
        required: true
    }
})

const Application = model('Application', applicationSchema)

module.exports = Application