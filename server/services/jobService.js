const Job = require('../models/Job')

async function getAll() {
    return Job.find({}).populate('category').populate('subCategory');
}

async function getByCategory(category_code) {
    return Job.find({ category_code }).populate('category').populate('subCategory');
}

async function getById(id) {
    return Job.findById(id).populate('category').populate('subCategory').populate('companyId').lean();
}

async function create(item) {
    return Job.create(item)
}

async function getJobRegistration(ownerId) {
    return Job.find({companyId: ownerId})
}

async function update(itemId, modifiedItemData, categoryId) {
    let existing = await Job.findById(itemId)

    existing.jobName = modifiedItemData.jobName
    existing.workType = modifiedItemData.workType
    existing.category = categoryId
    existing.category_code = modifiedItemData.categoryCode
    existing.subCategory = modifiedItemData.subCategories
    existing.seniority = modifiedItemData.seniority
    existing.desc = modifiedItemData.desc
    existing.city = modifiedItemData.city
    
    if( modifiedItemData.salary ) {
        existing.salary = modifiedItemData.salary
    }
    
    return await existing.save()//will return the saved Job Registration
}

async function deleteById(id) {
    return Job.findByIdAndRemove(id)
}

module.exports = {
    getAll,
    getByCategory,
    getJobRegistration,
    getById,
    create,
    update,
    deleteById
}

