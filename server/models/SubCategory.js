const { Schema, model, Types: { ObjectId } } = require('mongoose');

const subCategorySchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    counter: {
        type: Number,
        required: true,
    },
    mainCategory: {
        type: ObjectId,
        ref: 'Category',
        required: true
    }
})

const SubCategory = model('SubCategory', subCategorySchema)

module.exports = SubCategory;