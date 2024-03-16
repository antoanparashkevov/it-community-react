function parseCookie(req) {
    if( req.cookies ) {

        /*
        * req.headers.cookie or req.cookies if we use the cookie-parser structure
        * String => "theme=dark; visited=1";
        * 
        */
        
        //parse the cookies string into an associative array
        // return Object.fromEntries(
        //     req.cookies
        //         .split(';')
        //         .map(c => c.trim())
        //         .map(c => c.split('='))
        // )
        
        return req.cookies
    }
    return {};
}

module.exports = parseCookie;