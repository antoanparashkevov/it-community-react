const { Schema, model, Types: {ObjectId} } = require('mongoose')

const categorySchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    counter: {
        type: Number,
        default: 0
    },
    subCategories: {
        type: [ObjectId],
        ref: 'SubCategory',
        required: true
    }
})


const Category = model('Category', categorySchema)

module.exports = Category;