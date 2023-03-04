const { getAll, create, getById, getFreelancerRegistration, update, deleteById } = require("../services/jobService");
const parseError = require('../util/parseError')
const { hasUser, hasRole } = require("../middlewares/guards");
const router = require('express').Router();

const setCookie = require("../util/setCookie");

router.get('/jobs',async(req, res) => {
    let items = []
    try {
        if(req.query.where) {
            const ownerId = JSON.parse(req.query.where.split('=')[1])
             items = await getFreelancerRegistration(ownerId)
        } else {
            items = await getAll();
        }
        res.json(items)
    } catch ( err ) {
        const message = parseError(err);
        res.status(400).json({message})
    }
})

router.get('/jobs/:jobId', async (req,res) => {
    try {
        const jobId = req.params['jobId'];

        setCookie(req,res,jobId)

        const item = await getById(jobId);

        res.json({
            jobItem: item,
            visited: req.cookies[`visited_${jobId}`] || '1'
        })

    } catch ( err ) {
        const message = parseError(err)
        res.status(400).json({message})
    }
})

router.post('/jobs', hasUser(), hasRole(), async (req,res)  => {
    const formData = req.body;
  try {
      const data = Object.assign({
          _ownerId: req.user._id,
          companyOwner: req.user.companyName
      }, formData)
      
      const item = await create(data)
      
      res.json(item)
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
    }catch (err) {
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
    }catch (err) {
        const message = parseError(err);
        res.status(400).json({message})
    }
})

module.exports = router;