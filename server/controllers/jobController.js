const router = require('express').Router();
const { getAll, create, getById, update: updateJob, deleteById, getByCategory } = require("../services/jobService");
const { getByCode: getSubCategoryByCode } = require('../services/subCategoryService');
const { getByCode: getCategoryByCode } = require("../services/categoryService");

//utils
const parseError = require('../util/parseError')
const { hasUser, hasRole } = require("../middlewares/guards");
const formatDate = require('../util/formatDate')
const getUserData = require('../util/getUserData');
const transformWhiteSpacesUnderscore = require('../util/transformWhiteSpacesUnderscore');

const setCookie = require("../util/setCookie");

router.get('/jobs', async (req,res) => {
    let items = []
    try {
        if( req.query && req.query.where ) {
            let categoryCode = req.query.where.split('=')[1]
            items = await getByCategory(categoryCode);
        } else {
            items = await getAll();
        }
        const user = getUserData(req.user, req.token)

        res.json({
            user,
            jobs: items,
        })

    } catch ( err ) {
        const message = parseError(err);
        res.status(400).json({ message })
    }
})

router.get('/jobs/:jobId', async (req,res) => {
    try {
        const jobId = req.params['jobId'];
        setCookie(req,res,jobId)

        const item = await getById(jobId);
        const user = getUserData(req.user, req.token);
        
        let seniority_code = transformWhiteSpacesUnderscore(item['seniority']);
        
        item.seniority_code = seniority_code
        
       setTimeout(()=>{
           res.json({
               jobItem: { ...item, seniority_code },
               visited: req.cookies[`visited_${jobId}`] || '1',
               user
           })
       }, 4000)

    } catch ( err ) {
        const message = parseError(err)
        res.status(400).json({message})
    }
})

router.post('/jobs', hasUser(), hasRole(), async (req,res)  => {
    const formData = req.body;
    
    try {
        let data = {};
        let companyId;
        let category = await getCategoryByCode(formData.categoryCode)
        
        if( req.user && req.user._id ) {
            companyId = req.user._id;
        } else {
            throw new Error('You have a problem with your authentication as a company!')
        }
        
        
        category['counter']++;
        await category.save();
        
        
        let formattedDate = formatDate();
        
        data = {
            jobName: formData.jobName,
            workType: formData.workType,
            seniority: formData.seniority,
            category_code: formData.categoryCode,
            desc: formData.desc,
            city: formData.city,
            date: formattedDate,
            companyId
        }
        
        if ( formData.salary ) {
            data.salary = formData.salary
        }
        
        let job = await create(data)
        
        for( let subCategoryCode of formData['subCategories']) {
            const subCategory = await getSubCategoryByCode(subCategoryCode)
            subCategory[0]['counter'] += 1;
            
            await subCategory[0].save();
            
            if( subCategory ) {
                job['subCategory'].push(subCategory[0])
            }
        }
        
        job.category = category
        await job.save();
      
      res.json({
          _ownerId: req.user._id,
          companyOwner: req.user.companyName,
          ...job['_doc']
      })
    } catch (err) {
      const message = parseError(err)
      res.status(400).json({message})
    }
})

router.put('/jobs/:jobId', hasUser(), hasRole(), async (req,res) => {
    
    const jobId = req.params['jobId'];
    const formData = req.body;
    
    const item = await getById(jobId);
    
    if(req.user._id !== item['companyId']._id.toString()) {
        return res.status(403).json({message: "You cannot modify this resource!"})
    }
    
    try {
        const selectedCategory = await getCategoryByCode(formData.categoryCode)
        
        const result = await updateJob(jobId, formData, selectedCategory['_id'])
        
        res.json(result)
    } catch (err) {
        const message = parseError(err);
        res.status(400).json({message})
    }
})

router.delete('/jobs/:jobId', hasUser(), hasRole(), async (req,res)=> {
    const jobId = req.params['jobId'];
    const item = await getById(jobId);
    
    const category = await getCategoryByCode(item['category'].code)
    category.counter -= 1;
    await category.save();
    
    for( let subcategory in item['subCategory'] ) {
        const subCategoryItem = await getSubCategoryByCode(item['subCategory'][subcategory]['code'])
        subCategoryItem[0].counter -= 1;
        await subCategoryItem[0].save();
    }
    
    if(req.user._id !== item['companyId']._id.toString()) {
        return res.status(403).json({message: "You cannot modify this resource!"})
    }

    try {
        await deleteById(jobId)
        res.status(204).end()
    } catch (err) {
        const message = parseError(err);
        res.status(400).json({message})
    }
    
})

module.exports = router;