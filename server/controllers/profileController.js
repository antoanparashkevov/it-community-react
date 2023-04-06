const { hasUser, hasRole } = require("../middlewares/guards");
const parseError = require("../util/parseError");
const { getJobRegistration } = require("../services/jobService");

const router = require('express').Router()

router.get('/userInfo', hasUser(), hasRole(), async (req,res)=> {
    try{
        const jobs = await getJobRegistration(req.user._id)
        res.json({ userData: req.user, jobs })
    }catch (err) {
        const message = parseError(err)
        res.status(400).json({message})
    }
})


module.exports = router;