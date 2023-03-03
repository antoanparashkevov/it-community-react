const {register, login, logout} = require("../services/authService");
const {body,validationResult} = require('express-validator')
const router = require('express').Router()
const parseError = require('../util/parser')

router.post('/register' ,
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({min: 3}).withMessage('Password must be at least 3 characters long!'),
    async(req,res)=> {
    
    await authAction(req,res,register,400)
})

router.post('/login' , async(req,res)=> {
    await authAction(req,res,login,401)

})

router.get('/logout', async (req,res)=>{
    const token = req.token;
    console.log('Token from HEADER', token)
    await logout(token)
    res.status(204).end()
})

async function authAction(req,res, action, httpStatus) {
    const formData = req.body;
    try {
        const {errors} = validationResult(req)//array
        if(errors.length>0){
            throw errors;
        }
        const data =  await action(formData.email, formData.password)
        res.json(data);
    }catch (err) {
        const message = parseError(err)
        //400 -> bad request!
        res.status(httpStatus).json({
            message
        })
    }
}


module.exports = router;