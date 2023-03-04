const {getAll, create, getById, getFreelancerRegistration, update, deleteById } = require("../services/jobService");
const parseError = require('../util/parseError')
const {hasUser} = require("../middlewares/guards");
const router = require('express').Router();

router.get('/jobs',async(req, res)=>{
    let items = []
    try {
        if(req.query.where) {
            console.log(req.query.where)
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

router.post('/jobs',hasUser(),async (req,res)  => {
  try{
      const data = Object.assign({_ownerId: req.user._id}, req.body)
      const item = await create(data)
      res.json(item)
  }catch (err) {
      const message = parseError(err)
      res.status(400).json({message})
  }
})

router.get('/jobs/:id', async (req,res) =>{
    try {
        const id = req.params.id
        const item = await getById(id);
        res.json(item)
    } catch ( err ) {
        const message = parseError(err)
        res.status(400).json({message})
    }
})

router.put('/jobs/:id', hasUser(), async (req,res) =>{
    const id = req.params.id
    console.log('freelancerId from Service >>> ', id)
    const data = req.body
    console.log('Data entered from the client >>> ', data)
    const item = await getById(id);
    console.log('is the correct freelancer item ? >>> ', item)
    console.log('req user id >>> ', req.user._id)
    console.log('owner id (from freelancer item) >>> ', item._ownerId)
    if(req.user._id !== item._ownerId.toString()) {
        return res.status(403).json({message: "You cannot modify this resource!"})
    }
    try {
        const result = await update(id, data)
        res.json(result)
    }catch (err) {
        const message = parseError(err);
        res.status(400).json({message})
    }
})

router.delete('/jobs/:id', hasUser(), async (req,res)=> {
    const id = req.params.id
    const item = await getById(id);
    
    if(req.user._id !== item._ownerId.toString()) {
        return res.status(403).json({message: "You cannot modify this resource!"})
    }

    try {
        await deleteById(id)
        res.status(204).end()
    }catch (err) {
        const message = parseError(err);
        res.status(400).json({message})
    }
})

module.exports = router;