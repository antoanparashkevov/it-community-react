module.exports = () => (req,res,next) => {
    res.setHeader('Access-Control-Allow-Origin', process.env["FRONTEND_URL"])
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS,HEAD,GET,POST,PUT,DELETE,PATCH')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Authorization')
    res.setHeader('Access-Control-Allow-Credentials', 'true')
    
    next();
}