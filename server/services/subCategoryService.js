const SubCategory = require('../models/SubCategory')

async function getAll() {
    return SubCategory.find({})
}

async function create(item) {
    return SubCategory.create(item)
}


module.exports = {
    getAll,
    create
}