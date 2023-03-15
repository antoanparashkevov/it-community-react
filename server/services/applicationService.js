const Application = require('../models/Application')

async function getById(id) {
    return Application.find({companyId: id}).populate('userId').populate('companyId')
}

async function create(item) {
    return Application.create(item)
}

module.exports = {
    getById,
    create,
}

