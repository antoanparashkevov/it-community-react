const { create, getById } = require("../services/applicationService");
const { hasUser, hasRole } = require("../middlewares/guards");

//parsers
const parseError = require("../util/parseError");

const router = require('express').Router();

router.get('/applications/:companyId', hasUser(), hasRole(), async (req,res)=>{
    try {
        const companyId = req.params['companyId'];
        let items = await getById(companyId);
    
        res.json({
            applicationItems: items,
        })
    }catch ( err ) {
        const message = parseError(err)
        res.status(400).json({message})
    }
})

router.post('/applications', hasUser(), async (req,res)=> {
    const formData = req.body
    
    try{
        const item = await create(formData)
        res.json(item)
    }catch (err) {
        const message = parseError(err)
        res.status(400).json({message})
    }
})

module.exports = router;