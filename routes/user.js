const express = require('express')
const User = require('../models/user')

const router = express.Router()

router.get('/signin', (req, res) => {
    return res.render('signin')
})

router.post('/signin', async (req, res) => {
    const { email, password } = req.body;
    try {
        const token = await User.matchPasswordAndGenerateToken(email, password)
        res.cookie("token", token).redirect('/');
    } catch (error) {
        res.render('signin' ,{error : "Incorrect Email or Password"})
    }

})

router.get('/signup', (req, res) => {
    return res.render('signup')
})

router.post('/signup', async (req, res) => {
    const { fullname, email, password } = req.body;
    console.log(req.body);

    await User.create({
        fullname,
        email,
        password,
    })

    res.redirect('/')
});

router.get('/logout' , (req,res) =>{
    res.clearCookie("token").redirect('/');
})

module.exports = router
