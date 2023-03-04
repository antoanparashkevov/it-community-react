const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const SECRET_KEY = 'IT-COMMUNITY-SECRET-KEY'

let tokenBlackList = new Set();

async function register(email,password, role = 'user',desc, foundationYear) {
    const isExisting = await User.findOne({email}).collation({ locale:'en', strength:2 })
    
    if( isExisting ) {
        throw new Error('Email is taken')
    }
    const hashedPassword = await bcrypt.hash(password,10)//we save only the hashed password to the Database
    
    const user = await User.create({
        email,
        hashedPassword,
        desc,
        foundationYear,
        role
    });
    
    return createToken(user)
    
}
async function login(email,password) {
    const user = await User.findOne({email}).collation({locale: 'en', strength: 2})
    
    if(!user) {
        throw new Error ('Incorrect email or password')
    }
    
    const matchPassword = await bcrypt.compare(password, user['hashedPassword']);
    
    if(!matchPassword) {
        throw new Error ('Incorrect email or password')
    }
    
    return createToken(user)
}

async function logout(token) {
    tokenBlackList.add(token);
}

const createToken = function(user) {
    const payload = {
        _id: user._id,
        email: user.email,
        role: user.role
    };
    
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
    * */
    return jwt.verify(token,SECRET_KEY) //the payload
}

module.exports = {
    login,
    logout,
    register,
    parseToken
}