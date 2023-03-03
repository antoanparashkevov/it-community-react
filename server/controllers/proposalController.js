const { create, getById } = require("../services/proposalService");
const { hasUser } = require("../middlewares/guards");
const parseError = require("../util/parser");
const router = require('express').Router();

router.post('/proposals', async (req,res)=>{
    try{
        const data = req.body
        const item = await create(data)
        res.json(item)
    }catch (err) {
        const message = parseError(err)
        res.status(400).json({message})
    }
})

router.get('/proposals/:id', hasUser(), async (req,res)=>{
    try {
        const id = req.params.id
        let item = await getById(id);
        res.json(item)
    }catch ( err ) {
        const message = parseError(err)
        res.status(400).json({message})
    }
})

module.exports = router;