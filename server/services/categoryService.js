const Category = require('../models/Category');

async function getAll() {
    return Category.find({})
}

async function create(item) {
    return Category.create(item)
}

module.exports = {
    getAll,
    create
}