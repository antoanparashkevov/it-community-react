const parseCookie = require("./parseCookie");

module.exports = (req,res, itemId) => {
    if( req.url.includes(itemId) ) {
        const cookies = parseCookie(req);
        
        let visited = 1;
        if( cookies[`visited_${itemId}`] ) {
            
            visited = Number(cookies[`visited_${itemId}`])
        }
        visited++;
        res.cookie(`visited_${itemId}`, visited)
    }
}