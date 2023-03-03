const Freelancer = require('../models/Freelancer')

async function getAll () {
    return Freelancer.find({})
}

async function getById(id) {
    return Freelancer.findById(id)
}

async function create(item) {
    return Freelancer.create(item)
}

async function getFreelancerRegistration(ownerId) {
    return Freelancer.find({_ownerId: ownerId})
}

async function update(itemId, modifiedItemData) {
    let existing = await Freelancer.findById(itemId)
    
    existing.firstName = modifiedItemData.firstName
    existing.lastName = modifiedItemData.lastName
    existing.description = modifiedItemData.description
    existing.hourlyRate = modifiedItemData.hourlyRate
    existing.skills = modifiedItemData.skills
    
    return await existing.save()//will return the saved Freelancer Registration
}

async function deleteById(id) {
    return Freelancer.findByIdAndRemove(id)
}

module.exports = {
    getAll,
    getById,
    create,
    getFreelancerRegistration,
    update,
    deleteById
}

