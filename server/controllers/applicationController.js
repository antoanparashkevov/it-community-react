const { create, getById } = require("../services/applicationService");
const { hasUser, hasRole } = require("../middlewares/guards");

//parsers
const parseError = require("../util/parseError");

const router = require('express').Router();

router.post('/applications', hasUser(), async (req,res)=> {
    try{
        const data = req.body
        const item = await create(data)
        res.json(item)
    }catch (err) {
        const message = parseError(err)
        res.status(400).json({message})
    }
})

router.get('/applications/:applicationId', hasUser(), hasRole(), async (req,res)=>{
    try {
        const applicationId = req.params['applicationId'];
            
        let item = await getById(applicationId);
        
        res.json({ 
            applicationItem: item,
        })
    }catch ( err ) {
        const message = parseError(err)
        res.status(400).json({message})
    }
})




module.exports = router;