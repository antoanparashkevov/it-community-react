const {Schema, model, Types: {ObjectId}} = require('mongoose')

const jobSchema = new Schema({
    jobName: {
        type: String,
        minLength: [5, 'Please describe the job name better with more characters!'],
        maxLength: [30, 'You typed a very long job name! The restriction is 30 characters!'],
        required: true,
    },
    workType:{
        type: [String],
        enum: {
            values: ['Hybrid', 'Remote', 'Office'],
            message: '{VALUE} is not supported!'
        },
        required: true
    },
    date: {
        type: String,
        required: true
    },
    category: {
      type: ObjectId,
      ref: 'Category',
    },
    category_code: {
        type: String,
        required: true
    },
    subCategory: {
        type: [ObjectId],
        default: [],
        ref: 'SubCategory',
    },
    seniority: {
        type: String,
        enum: {
            values: ['Intern', 'Junior', 'Senior', 'Team Lead'],
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
    companyId: {
        type: ObjectId,
        ref: 'Company',
        required: true,  
    },
})

const Job = model('Job', jobSchema)

module.exports = Job