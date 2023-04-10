const {Schema, model, Types: { ObjectId }} = require('mongoose')


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
        maxLength: [70, 'The message is too long! The max characters are 70'],
        required: true
    },
    userId: {
        type: ObjectId,
        required: true
    },
    companyId: {
        type: ObjectId,
        required: true
    }
})

const Application = model('Application', applicationSchema)

module.exports = Application