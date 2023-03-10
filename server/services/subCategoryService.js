const SubCategory = require('../models/SubCategory')

async function getAll() {
    return SubCategory.find({})
}

async function getByCode(code) {
    return SubCategory.find({ code: code })
}

async function create(item) {
    return SubCategory.create(item)
}


module.exports = {
    getAll,
    getByCode,
    create
}