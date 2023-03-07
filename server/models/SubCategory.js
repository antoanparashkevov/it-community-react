const { Schema, model, Types: { ObjectId } } = require('mongoose');

const subCategorySchema = new Schema({
    title: {
        type: String,
        minLength: [3, 'The Category name requires to be at least 5 characters long'],
        required: true,
    },
    code: {
        type: String,
        required: true
    },
    counter: {
        type: Number,
        default: 0
    },
    mainCategory: {
        type: ObjectId,
        ref: 'Category',
        required: true
    }
})

subCategorySchema.index( {title: 1}, {
    collation: {
        locale: 'en',//english letters only
        strength: 1 //case sensitive
    }
})

const SubCategory = model('SubCategory', subCategorySchema)

module.exports = SubCategory;