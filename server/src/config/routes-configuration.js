//Controllers...
const authController = require('../controllers/authController')
const jobController = require('../controllers/jobController')
const applicationController = require('../controllers/applicationController')
const profileController = require('../controllers/profileController')
const categoryController = require('../controllers/categoryController')
const subCategoryController = require('../controllers/subCategoryController')
const cookieController = require('../controllers/cookieController')

//utils
const parseError = require("../util/parseError");
const getUserData = require('../util/getUserData');

const configRoutes = (app) => {
    app.get('/', (req,res)=>{
        res.json({
            message: 'REST service operational!'
        })
    });

    app.use(process.env['AUTH_MOUNT_API_URL'], authController)
    app.use(process.env['JOB_MOUNT_API_URL'], jobController)
    app.use(process.env['APPLICATION_MOUNT_API_URL'], applicationController)
    app.use(process.env['CATEGORY_MOUNT_API_URL'], categoryController)
    app.use(process.env['SUBCATEGORY_MOUNT_API_URL'], subCategoryController)
    app.use(process.env['PROFILE_MOUNT_API_URL'], profileController)
    app.use(process.env['COOKIE_MOUNT_API_URL'], cookieController)

    app.get(process.env['USER_API_URL'], (req, res) => {
        const user = getUserData(req.user, req.token)
        try {
            res.json(user);
        } catch ( err ) {
            const message = parseError(err);
            res.status(400).json({ message })
        }
    })
}

module.exports = configRoutes