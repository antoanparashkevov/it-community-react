const {parseToken} = require("../services/authService");

module.exports = () => (req,res,next) => {
    const token = req.headers['x-authorization']
    
    if ( token ) {
        try {
            req.user = parseToken(token);
            req.token = token;
        } catch (error) {
            return res.status(403).json({message: 'Invalid authorization token!'})
        }
    }
    
    next();
}