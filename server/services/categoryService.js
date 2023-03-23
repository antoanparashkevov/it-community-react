const Category = require('../models/Category');

async function getAll() {
    return Category.find({}).populate('subCategories');
}

async function getByCode(code) {
    return Category.findOne({code: code}).populate('subCategories').lean();
}

async function create(item) {
    return Category.create(item)
}

module.exports = {
    getAll,
    create,
    getByCode
}