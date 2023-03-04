const { create, getById } = require("../services/applicationService");
const { hasUser } = require("../middlewares/guards");

//parsers
const parseError = require("../util/parseError");
const parseCookie = require("../util/parseCookie");

const router = require('express').Router();

router.post('/applications', async (req,res)=> {
    try{
        const data = req.body
        const item = await create(data)
        res.json(item)
    }catch (err) {
        const message = parseError(err)
        res.status(400).json({message})
    }
})

router.get('/applications/:posterId', async (req,res)=>{
    try {
        const posterId = req.params['posterId'];
        
        //visited counter set as a cookie named 'visited'
        if( req.url === '/applications/' + posterId) {
            
           const cookies = parseCookie(req);
           console.log(cookies)
            let visited = 1;
            //TODO use this visited counter in the front end
            if( cookies[`visited_${posterId}`] ) {

                visited = Number(cookies[`visited_${posterId}`]);
            }
            
            visited++;
            
            // res.writeHead(200, {
            //     'Set-Cookie': `visited_${posterId}=${visited}; httpOnly`,//httpOnly protects from the document.cookie script
            // })
            
            //using the cookie-parser
            res.cookie(`visited_${posterId}`,visited)
        }
            
        let item = await getById(posterId);
        
        res.json({ 
            jobItem: item,
            visited: req.cookies[`visited_${posterId}`] || '1'
        })
    }catch ( err ) {
        const message = parseError(err)
        res.status(400).json({message})
    }
})




module.exports = router;