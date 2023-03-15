const express = require('express');
const cookieParser = require('cookie-parser');

const mongoose = require("mongoose");

const port = 3030;

//TODO with environment
const CONNECTION_STR = 'mongodb://localhost:27017/it-community'

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
       await mongoose.connect(CONNECTION_STR, {
           useUnifiedTopology: true,
           useNewUrlParser: true
       })
        console.log('Database connected!');
    } catch (err) {
        console.error(err.message);
    }

    app.use(cookieParser());
    app.use(express.json());
    app.use(cors());
    app.use(trimBody());
    app.use(session());
    
    app.get('/', (req,res)=>{
       res.json({
           message: 'REST service operational!'
       })
    });
    
    app.use('/authData', authController)
    app.use('/jobData', jobController)
    app.use('/applicationData', applicationController)
    app.use('/categoryData', categoryController)
    app.use('/subCategoryData', subCategoryController)
    app.use('/profileData', profileController)
    app.use('/cookieData', cookieController)
    
    app.get('/userData', (req, res) => {
        const user = getUserData(req.user, req.token)
        try {
            console.log('user', user)
            res.json(user);
        } catch ( err ) {
            const message = parseError(err);
            res.status(400).json({ message })
        }
    })
    
    app.listen(port, () => console.log('Server listening on port ' + port))
}


