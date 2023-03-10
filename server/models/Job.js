const {Schema, model, Types: {ObjectId}} = require('mongoose')

const jobSchema = new Schema({
    jobName: {
        type: String,
        minLength: [5, 'Please describe the job name better with more characters!'],
        maxLength: [30, 'You typed a very long job name! The restriction is 30 characters!'],
        required: true,
    },
    workType:{
        type: String,
        enum: {
            values: ['hybrid', 'remote', 'office'],
            message: '{VALUE} is not supported!'
        },
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    },
    category: {
      type: ObjectId,
      ref: 'Category',
      required: true,  
    },
    subCat: {
        type: [ObjectId],
        default: [],
        ref: 'SubCategory',
        required: true,
    },
    seniority: {
        type: String,
        enum: {
            values: ['intern', 'junior', 'senior', 'team_lead'],
            message: '{VALUE} is not supported!'
        },
        required: true,  
    },
    salary: {
        type: Number,
        min: [1, 'Please set a valid non-negative salary!'],
    },
    desc:{
        type: String,
        required: true,
        minLength: [20, 'Description must be at least 20 characters long']
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