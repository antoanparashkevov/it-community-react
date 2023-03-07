const { Schema, model, Types: {ObjectId} } = require('mongoose')

const categorySchema = new Schema({
    title: {
        type: String,
        minLength: [5, 'The Category name requires to be at least 5 characters long'],
        unique: true,
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
    subCategories: {
        type: [ObjectId],
        ref: 'SubCategory',
    }
})

categorySchema.index({title: 1}/*asc order*/, {
    collation: {
        locale: 'en',//english letters only
        strength: 1 //case sensitive
    }
})


const Category = model('Category', categorySchema)

module.exports = Category;