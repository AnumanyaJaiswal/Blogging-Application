const express = require('express')
const path = require('path')
const userRoute = require('./routes/user')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const checkForAuthenticatioin = require('./middlewares/authenticatioin')
const BlogRoute = require('./routes/blog')

const app = express()
const PORT = 8000;

mongoose.connect("mongodb://localhost:27017/blogify").then(() => console.log("MongoDb Connected"))

app.set('view engine' , 'ejs');
app.set('views' , path.resolve('./views'))

app.use(express.urlencoded( { extended: false}))
app.use(cookieParser());
app.use(checkForAuthenticatioin("token"))

app.get('/' , (req,res) =>{
    return res.render('home' ,{
        user: req.user
    })
})

app.use('/user' , userRoute)
app.use('/blog' , BlogRoute);

app.listen(PORT , () => console.log("Server running at PORT 8000"))