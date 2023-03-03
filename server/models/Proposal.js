const {Schema, model} = require('mongoose')


const proposalSchema = new Schema({
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

const Proposal = model('Proposal', proposalSchema)

module.exports = Proposal