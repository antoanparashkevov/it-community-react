const router = require('express').Router();

const { getAll, create } = require('../services/subCategoryService')
const { getByCode } = require('../services/categoryService')
const { isAdmin } = require('../middlewares/guards');

//utils
const transformWhiteSpacesUnderscore = require("../util/transformWhiteSpacesUnderscore");
const capitalLetterWord = require("../util/capitalLetterWord");
const parseError = require('../util/parseError');
const getUserData = require('../util/getUserData');



router.get('/subcategories', async (req,res) => {
    try {
        const subcategories = await getAll();
        const user = getUserData(req.user, req.token);
        
        res.json({ 
            subcategories,
            user
        });
    } catch ( err ) {
        const message = parseError( err )
        res.status(400).json({message})
    }
})

router.post('/subcategories', isAdmin(), async (req,res) => {
    const formData = req.body;
    console.log('formData (subCategory) >>> ', formData);
    let code;

    if( formData && formData.title ) {

        //make the first letter for each word a capital
        formData.title = capitalLetterWord(formData.title);

        code = transformWhiteSpacesUnderscore(formData.title)
    }

    const subCategoryToCreate = {
        title: formData.title,
        code
    }
    try {
        let mainCategory = await getByCode(formData.categoryCode);
        let subCategory = await create(subCategoryToCreate);


        mainCategory.subCategories.push(subCategory);
        await mainCategory.save();

        res.json({ subCategory: subCategory, category: mainCategory });
    } catch ( err ) {
        
        const message = parseError( err )
        res.status(400).json({message})
    }
})

module.exports = router;