const { getAll, create } = require('../services/categoryService');
const parseError = require('../util/parser')
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

router.post('/categories', async (req,res) => {
    try {
        const category = req.body;
        await create(category)
        res.json(category)
    } catch ( err ) {
        const message = parseError( err ) 
        res.status(400).json({message})
    }
})

module.exports = router;