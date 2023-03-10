const { Schema, model } = require('mongoose');

const subCategorySchema = new Schema({
    title: {
        type: String,
        minLength: [3, 'The Category name requires to be at least 5 characters long'],
        unique: true,
        required: [true, 'This is a required field!'],
    },
    code: {
        type: String,
        required: true
    },
    counter: {
        type: Number,
        default: 0
    },
})

subCategorySchema.index( {title: 1}, {
    collation: {
        locale: 'en',//english letters only
        strength: 1 //case sensitive
    }
})


const SubCategory = model('SubCategory', subCategorySchema)

module.exports = SubCategory;