const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const SECRET_KEY = 'IT-COMMUNITY-SECRET-KEY'

let tokenBlackList = new Set();

async function registerAsCompany(email,password, companyName, desc, foundationYear, role = 'company') {
    const isExisting = await User.findOne({email}).collation({ locale:'en', strength:2 })

    if( isExisting ) {
        throw new Error('Email is taken')
    }
    const hashedPassword = await bcrypt.hash(password,10)//we save only the hashed password to the Database

    const user = await User.create({
        email,
        hashedPassword,
        companyName,
        desc,
        foundationYear,
        role
    });
    
    return createToken(user, 'company')
}

async function register(email,password, role = 'user') {
    const isExisting = await User.findOne({email}).collation({ locale:'en', strength:2 })
    
    if( isExisting ) {
        throw new Error('Email is taken')
    }
    const hashedPassword = await bcrypt.hash(password,10)//we save only the hashed password to the Database
    
    const user = await User.create({
        email,
        hashedPassword,
        role
    });
    
    return createToken(user, 'user')
    
}
async function login(email,password) {
    const user = await User.findOne({email}).collation({locale: 'en', strength: 2})
    
    if(!user) {
        throw new Error ('Incorrect email or password')
    }
    
    //it will return true of false
    const matchPassword = await bcrypt.compare(password, user['hashedPassword']);
    
    if( !matchPassword ) {
        throw new Error ('Incorrect email or password')
    }
    
    return createToken(user)
}

async function logout(token) {
    tokenBlackList.add(token);
}

const createToken = function(user, role) {
    let payload;
    
    if( role === 'company') {
        
        payload = {
            _id: user._id,
            email: user.email,
            companyName: user.companyName,
            role: user.role
        };
    } else if ( role === 'user' ) {
        payload = {
            _id: user._id,
            email: user.email,
            role: user.role
        };
    }
    
    
   return {
       accessToken: jwt.sign(payload, SECRET_KEY),
       _id: user._id,
       email: user.email,
       role: user.role
   }
}

function parseToken(token) {
    
    if(tokenBlackList.has(token)) {
        throw new Error('The token is blacklisted!')
    }
    /* PAYLOAD TO RETURN
    * _id: user._id
    * email: user.email
    * companyName?: role.companyName,
    * role: user.role
    * */
    return jwt.verify(token,SECRET_KEY) //the payload
}

module.exports = {
    login,
    logout,
    register,
    registerAsCompany,
    parseToken
}