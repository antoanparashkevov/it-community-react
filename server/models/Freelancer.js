const {Schema, model, Types: {ObjectId}} = require('mongoose')

const freelancerSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true,
        min: [20, 'Description must be at least 20 characters long']
    },
    hourlyRate:{
        type: Number,
        required: true
    }, 
    skills:{
        type: [],
        required: true,
        minLength: [1, 'Choose at least one area of expertise']
    },
    _ownerId: {
        type: ObjectId,
        ref: 'User',
        required: true
    }
})

const Freelancer = model('Freelancer', freelancerSchema)

module.exports = Freelancer