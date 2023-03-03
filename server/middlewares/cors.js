module.exports = () => (req,res,next) => {
    // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS,HEAD,GET,POST,PUT,DELETE,PATCH')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Authorization')
    
    next();
}