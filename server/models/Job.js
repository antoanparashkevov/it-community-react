const {Schema, model, Types: {ObjectId}} = require('mongoose')

const jobSchema = new Schema({
    jobName: {
        type: String,
        required: true,
    },
    workType:{
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    },
    subCat: {
        type: Array,
        default: [],
        required: true,
    },
    seniority: {
      type: String,
      required: true,  
    },
    salary: {
      type: Number,
    },
    desc:{
        type: String,
        required: true,
        min: [20, 'Description must be at least 20 characters long']
    },
    country: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true,
    },
    companyOwner: {
      type: ObjectId,
      ref: 'User',
      required: true,  
    },
    _ownerId: {
        type: ObjectId,
        ref: 'User',
        required: true
    }
})

const Job = model('Job', jobSchema)

module.exports = Job