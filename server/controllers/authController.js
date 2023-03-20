const {register, login, logout, registerAsCompany, loginAsCompany } = require("../services/authService");
const { body,validationResult } = require('express-validator');
const router = require('express').Router();

const parseError = require('../util/parseError');

router.post('/signup',
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({min: 6}).withMessage('Password must be at least 6 characters long!'),
    async (req,res) => {
    await authAction(req,res,'register',400)
})

router.post('/signup_company',
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({min: 6}).withMessage('Password must be at least 6 characters long!'),
    async (req,res) => {
    await authAction(req,res,'register_company',400)
})

router.post('/login', async(req,res)=> {
    await authAction(req,res,'login',401)
})

router.post('/login_company', async(req,res)=> {
    await authAction(req,res,'login_company',401)
})

router.get('/logout', async (req,res)=>{
    const token = req.token;
    
    await logout(token)
    res.status(204).end()
})

async function authAction(req,res, action, httpErrorStatus) {
    const formData = req.body;
    
    try {
        const { errors } = validationResult(req)//an array
        
        if( errors.length > 0 ) {
            throw errors;//the catch block will catch the errors
        }
        
        let data;
        
        if ( action  === 'register' ) {
            data = await register(formData.email, formData.password)
        } else if( action === 'register_company') {
            data = await registerAsCompany(formData.email, formData.password, formData.companyName, formData.desc, formData.employees, formData.foundationYear)
        } else if( action === 'login_company') {
            data = await loginAsCompany(formData.email, formData.password)
        } else {
            data = await login(formData.email, formData.password)
        }
        
        res.json(data);
        
    } catch (err) {
        const message = parseError(err)
        console.log('message >>> ', message)
        //400 -> bad request!
        //400 -> unauthorized
        res.status(httpErrorStatus).json({
            message
        })
    }
}


module.exports = router;