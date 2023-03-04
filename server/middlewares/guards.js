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
        
        if( req.user.roles.includes('company') === false ) {
            res.status(400).json( { message: 'You are not registered as a company!' })
        } else {
            next();
        }
        
    }
}

function isAdmin() {
    
    return ( req,res,next ) => {
        
        if( req.user.roles.includes('admin') === false ) {
            res.status(400).json( { message: 'You don\'t have permissions to perform this action! Contact support!' } )
        } else {
            next();
        }
    }
}

module.exports = {
    hasUser,
    isGuest,
    hasRole,
    isAdmin
}