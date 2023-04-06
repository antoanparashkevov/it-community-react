const { getAll, create, getByCode } = require('../services/categoryService');
const parseError = require('../util/parseError');
const { hasRole, isAdmin, hasUser } = require("../middlewares/guards");
const Category = require('../models/Category');
const router = require('express').Router();

//util
const capitalLetterWord = require('../util/capitalLetterWord');
const transformWhiteSpacesUnderscore = require('../util/transformWhiteSpacesUnderscore');
const getUserData = require('../util/getUserData');

router.get('/categories', async (req,res) => {
    try {
        const user = getUserData(req.user, req.token)
        
        if(req.query && req.query.where) {
            const categoryCode = req.query.where.split('=')[1]
            let category = await getByCode(categoryCode)
            res.json({ 
                category,
                user
            })
        } else {
            let items = await getAll()
            res.json({
                items,
                user
            })
        }
    } catch ( error ) {
        const message = parseError( error );
        res.status(400).json({ message })
    }
})

router.post('/categories', hasUser(), hasRole(), isAdmin(), async (req,res) => {
    const formData = req.body;

    let code;
    
    if( formData && formData.title ) {
        
        //make the first letter for each word a capital
        formData.title = capitalLetterWord(formData.title);
        
        code = transformWhiteSpacesUnderscore(formData.title)
    }
    
    try {
        const category = formData;
        
        const existingCategory = await Category.findOne({ code }).collation({
            locale: 'en',
            strength: 2
        })
        
        if( existingCategory ) {
            throw new Error('You are trying to create a category which already exists!')
        }
        
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