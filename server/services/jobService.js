const Job = require('../models/Job')

async function getAll() {
    return Job.find({}).populate('category').populate('subCategory');
}

async function getById(id) {
    return Job.findById(id).populate('category').populate('subCategory').populate('companyId');
}

async function create(item) {
    return Job.create(item)
}

// async function getJobRegistration(ownerId) {
//     return Job.find({_ownerId: ownerId})
// }
//
// async function update(itemId, modifiedItemData) {
//     let existing = await Job.findById(itemId)
//    
//     console.log('Existing job item >>>', existing)
//    
//     //TODO update all entries wit the correct ones
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

