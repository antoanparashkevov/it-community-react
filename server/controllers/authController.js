const {register, login, logout} = require("../services/authService");
const {body,validationResult} = require('express-validator');
const router = require('express').Router();

const parseError = require('../util/parseError');

router.post('/register' ,
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({min: 3}).withMessage('Password must be at least 3 characters long!'),
    async (req,res)=> {
    
    await authAction(req,res,register,400)
})

router.post('/login' , async(req,res)=> {
    await authAction(req,res,login,401)
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
        
        if( errors.length>0 ) {
            throw errors;//the catch block will catch the errors
        }
        
        let data;
        
        if ( action  === 'register' ) {
            data = await action(formData.email, formData.password, formData.desc, formData.foundationYear, formData.role)
        } else {
            data = await action(formData.email, formData.password)
        }
        
        res.json(data);
        
    } catch (err) {
        const message = parseError(err)
        //400 -> bad request!
        //400 -> unauthorized
        res.status(httpErrorStatus).json({
            message
        })
    }
}


module.exports = router;