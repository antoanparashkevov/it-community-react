const Job = require('../models/Job')

async function getAll() {
    return Job.find({})
}

async function getById(id) {
    return Job.findById(id)
}

async function create(item) {
    return Job.create(item)
}

// async function getJobRegistration(ownerId) {
//     return Job.find({_ownerId: ownerId})
// }

// async function update(itemId, modifiedItemData) {
//     let existing = await Job.findById(itemId)
//    
//     existing.firstName = modifiedItemData.firstName
//     existing.lastName = modifiedItemData.lastName
//     existing.description = modifiedItemData.description
//     existing.hourlyRate = modifiedItemData.hourlyRate
//     existing.skills = modifiedItemData.skills
//    
//     return await existing.save()//will return the saved Job Registration
// }

async function deleteById(id) {
    return Job.findByIdAndRemove(id)
}

module.exports = {
    getAll,
    getById,
    create,
    deleteById
}

