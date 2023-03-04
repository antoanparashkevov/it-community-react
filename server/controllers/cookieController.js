const router = require('express').Router();

router.get('/cookies',  (req,res) => {
    res.json({
        cookies: req.cookies,
        theme: req.cookies['theme']
    })
});

router.post('/setTheme', (req,res) => {

    /*
    * req.body structure
    * {
    *   "theme": "dark/light"
    * }
    * */

    res.cookie('theme', req.body.theme);
    res.json(req.body)
})

module.exports = router;