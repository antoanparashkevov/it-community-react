function hasUser() {
    return (req,res,next) => {
        if( req.user ) {
            next();
        }else {
            res.status(401).json( {message: 'Please login'} )
        }
    }
}

function isGuest () {
    
    return ( req,res,next ) => {
        if( req.user ) {
            res.status(400).json( {message: 'You are already logged in'} )
        } else {
            next();
        }
    }
}

function hasRole() {
    
    return ( req, res, next ) => {
        if( req.user.role !== 'company' ) {
            res.status(400).json( { message: 'You are not registered as a company!' })
        } else {
            next();
        }
        
    }
}

module.exports = {
    hasUser,
    isGuest,
    hasRole
}