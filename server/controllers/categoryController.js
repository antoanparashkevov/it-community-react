const { getAll, create } = require('../services/categoryService');
const parseError = require('../util/parseError');
const { isAdmin } = require("../middlewares/guards");
const router = require('express').Router();


router.get('/categories', async (req,res) => {
    try {
        let items = await getAll()
        res.json(items)
    } catch ( error ) {
        const message = parseError( error );
        res.status(400).json({ message })
    }
})

router.post('/categories', isAdmin(), async (req,res) => {
    const formData = req.body;
    try {
        const category = formData;
        
        await create(category)
        res.json(category)
    } catch ( err ) {
        
        const message = parseError( err ) 
        res.status(400).json({message})
    }
})

module.exports = router;