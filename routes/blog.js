const express = require('express')
const router = express.Router();

router.get('/add-blog' ,(req,res) =>{
    res.render('blog' ,{
        user: req.user
    })
})

router.post('/' , (req,res) =>{
    console.log(req.body);
    res.redirect('/');
    
})

module.exports = router;