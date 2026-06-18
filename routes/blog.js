const express = require('express')
const router = express.Router();
const multer = require('multer')
const path = require('path')
const Blog = require('../models/blog');
const { findById } = require('../models/user');
const Comment = require('../models/comments')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve(`./public/uploads`));
    },

    filename: function (req, file, cb) {
        cb(
            null,
            Date.now() + "-" + file.originalname
        );
    }
});

const upload = multer({storage});

router.get('/add-blog', (req, res) => {
    res.render('addBlog', {
        user: req.user
    })
    console.log(req.user);
})

router.get('/:id' , async(req,res) =>{
    const blog = await Blog.findById(req.params.id);
    const comments = await Comment.find({blogId: blog._id}).populate("createdBy");
    res.render('blog' , {
        user: req.user,
        blog,
        comments,
    })
})

router.post('/', upload.single("coverImage"), async(req, res) => {
    const { title , body } = req.body;
    const blog = await Blog.create({
        title,
        body,
        createdBy: req.user._id,
        coverImage: `/uploads/${req.file.filename}`
    })
    res.redirect(`/blog/${blog._id}`);

})

router.post('/comment/:blogId' , async(req,res) =>{
    await Comment.create({
        content: req.body.content,
        blogId: req.params.blogId,
        createdBy: req.user._id
    })
    res.redirect(`/blog/${req.params.blogId}`)
})



module.exports = router;