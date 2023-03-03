const Proposal = require('../models/Proposal')

// async function getAll () {
//     return Proposal.find({})
// }

async function getById(id) {
    return Proposal.find({userId: id})
}

async function create(item) {
    return Proposal.create(item)
}

module.exports = {
    getById,
    create,
}

