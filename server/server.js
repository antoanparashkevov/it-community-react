const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

require('dotenv').config();//this will read .env file and paste everything inside the process.env object

const mongoose = require("mongoose");

//Controllers...
const authController = require('./controllers/authController')
const jobController = require('./controllers/jobController')
const applicationController = require('./controllers/applicationController')
const profileController = require('./controllers/profileController')
const categoryController = require('./controllers/categoryController')
const subCategoryController = require('./controllers/subCategoryController')
const cookieController = require('./controllers/cookieController')

//Middlewares
const cors = require('./middlewares/cors')
const trimBody = require('./middlewares/trimBody')
const session = require('./middlewares/session')

//utils
const parseError = require("./util/parseError");
const getUserData = require('./util/getUserData');

start();

async function start() {
    const app = express();

    try {
       await mongoose.connect(process.env['DATABASE_CONNECTION'], {
           useUnifiedTopology: true,
           useNewUrlParser: true
       })
        console.log('Database connected!');
    } catch (err) {
        console.error(err.message);
    }

    app.use(cookieParser());
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({
        extended: false
    }))
    app.use(cors());
    app.use(trimBody());
    app.use(session());
    app.use('/uploads', express.static('uploads'));//access this folder publicly 
    
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
            setTimeout( () => {
                res.json(user);
                
            }, 1000)
        } catch ( err ) {
            const message = parseError(err);
            res.status(400).json({ message })
        }
    })
    
    app.listen(process.env['DATABASE_PORT'], () => console.log('Server listening on port ' + process.env['DATABASE_PORT']))
}


