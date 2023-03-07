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

//todo add the isAdmin guard
router.post('/categories', async (req,res) => {
    const formData = req.body;
    console.log('formData (category) >>> ', req.body)
    let code;
    
    if( formData && formData.title ) {
        
        //make the first letter for each word a capital
        formData.title = formData.title.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
        
        code = formData.title.toLowerCase().trim().replace(' ','_')
    }
    
    try {
        const category = formData;
        
        const categoryToCreate = {
            ...category,
            code
        }
        
        await create(categoryToCreate)
        res.json(categoryToCreate)
    } catch ( err ) {
        
        const message = parseError( err ) 
        res.status(400).json({message})
    }
})

module.exports = router;