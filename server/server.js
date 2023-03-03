const express = require('express')

const mongoose = require("mongoose");

const port = 3030;
const CONNECTION_STR = 'mongodb://localhost:27017/it-community'

//Controllers...
const authController = require('./controllers/authController')
const jobController = require('./controllers/jobController')
const applicationController = require('./controllers/applicationController')
const profileController = require('./controllers/profileController')
const categoryController = require('./controllers/categoryController')
const subCategoryController = require('./controllers/subCategoryController')

//Middlewares
const cors = require('./middlewares/cors')
const trimBody = require('./middlewares/trimBody')
const session = require('./middlewares/session')

start();

async function start() {
    const app = express();

    try {
       await mongoose.connect(CONNECTION_STR)
        console.log('DATABASE connected!')
    } catch (err) {
        console.error(err.message)
    }

    app.use(express.json())
    app.use(cors())
    app.use(trimBody())
    app.use(session())
    
    app.get('/', (req,res)=>{
       res.json({
           message: 'REST service operational!'
       })
    });
    
    app.use('/users', authController)
    app.use('/jobData', jobController)
    app.use('/applicationData', applicationController)
    app.use('/categoryData', categoryController)
    app.use('/subCategoryData', subCategoryController)
    app.use('/profileData', profileController)
    
    app.listen(port, () => console.log('Server listening on port ' + port))
}


