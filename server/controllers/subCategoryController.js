const { getAll, create } = require('../services/subCategoryService')
const parseError = require('../util/parseError');

const router = require('express').Router();

router.get('/subcategories', async (req,res) => {
    try {
        const subcategories = await getAll();
        res.json(subcategories);
    } catch ( err ) {
        const message = parseError( err )
        res.status(400).json({message})
    }
})

router.post('/subcategories', async (req,res) => {
    try {
        const subcategory = req.body
        await create(subcategory)
        res.json(subcategory)
    } catch ( err ) {
        const message = parseError( err )
        res.status(400).json({message})
    }
})

module.exports = router;