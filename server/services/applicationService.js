const Application = require('../models/Application')

// async function getAll () {
//     return Application.find({})
// }

async function getById(id) {
    return Application.find({userId: id})
}

async function create(item) {
    return Application.create(item)
}

module.exports = {
    getById,
    create,
}

