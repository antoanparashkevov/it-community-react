const { getAll, create, getById, update, deleteById } = require("../services/jobService");
const { getByCode: getSubCategoryByCode  } = require('../services/subCategoryService');
const { getByCode: getCategoryByCode } = require("../services/categoryService");

const parseError = require('../util/parseError')
const { hasUser, hasRole } = require("../middlewares/guards");
const router = require('express').Router();

const setCookie = require("../util/setCookie");

router.get('/jobs',async(req, res) => {
    let items = []
    
    try {
        
        items = await getAll();
        res.json(items)
        
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
        
        let location = {
            country: item['country'],
            city: item['city']
        }
        
        delete item['country'];
        delete item['city'];
        
        item.location = location;
        
        res.json({
            jobItem: item,
            visited: req.cookies[`visited_${jobId}`] || '1'
        })

    } catch ( err ) {
        const message = parseError(err)
        res.status(400).json({message})
    }
})

//TODO ADD hasUser(), hasRole()
router.post('/jobs', async (req,res)  => {
    
    const formData = req.body;

    try {
        let data = {}
        let category = await getCategoryByCode(formData.categoryCode)
        
        category['counter']++;
        await category.save();
        
        
        data = {
            jobName: formData.jobName,
            workType: formData.workType,
            seniority: formData.seniority,
            desc: formData.desc,
            city: formData.city
        }
        
        if ( formData.salary ) {
            data.salary = formData.salary
        }
        
        let job = await create(data)
        
        for( let subCategoryCode of formData['subCategories']) {
            const subCategory = await getSubCategoryByCode(subCategoryCode)
            
            if( subCategory ) {
                job['subCategory'].push(subCategory[0])
            }
        }
        
        job.category = category
        await job.save();
        
        console.log('JOB >>> ', job)
      //data = Object.assign({
      //     _ownerId: req.user._id,
      //     companyOwner: req.user.companyName
      // }, formData)
        
      // res.json(data)
    } catch (err) {
      const message = parseError(err)
      res.status(400).json({message})
    }
})

router.put('/jobs/:jobId', hasUser(), hasRole(), async (req,res) => {
    
    const jobId = req.params['jobId'];
    const data = req.body;
    
    const item = await getById(jobId);
    
    if(req.user._id !== item['_ownerId'].toString()) {
        return res.status(403).json({message: "You cannot modify this resource!"})
        
    }
    
    try {
        const result = await update(jobId, data)
        res.json(result)
    } catch (err) {
        const message = parseError(err);
        res.status(400).json({message})
    }
})

router.delete('/jobs/:jobId', hasUser(), hasRole(), async (req,res)=> {
    const jobId = req.params['jobId'];
    const item = await getById(jobId);
    
    if(req.user._id !== item['_ownerId'].toString()) {
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