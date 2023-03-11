const SubCategory = require('../models/SubCategory')

async function getAll() {
    return SubCategory.find({})
}

async function getById(id) {
    return SubCategory.findById(id)
}

async function getByCode(code) {
    return SubCategory.find({ code: code })
}

// async function getByCodeAndUpdate(code, updateField)

async function create(item) {
    return SubCategory.create(item)
}


module.exports = {
    getAll,
    getById,
    getByCode,
    create
}