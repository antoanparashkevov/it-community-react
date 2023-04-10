const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

//Middlewares
const cors = require('../middlewares/cors')
const trimBody = require('../middlewares/trimBody')
const session = require('../middlewares/session')

const configExpress = (app) => {

    app.use(cors());
    app.use(cookieParser());
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({
        extended: false
    }))
    app.use(trimBody());
    app.use(session());
    app.use(express.static(__dirname));//access this folder publicly 
}

module.exports = configExpress;