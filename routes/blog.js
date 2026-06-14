const express = require('express')
const router = express.Router();
const multer = require('multer')
const path = require('path')
const Blog = require('../models/blog')

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
    res.render('blog', {
        user: req.user
    })
})

router.post('/', upload.single("coverImage"), (req, res) => {
    const { title , body } = req.body;
    const blog = Blog.create({
        title,
        body,
        createdBy: req.user._id,
        coverImage: `/uploads/${req.file.filename}`
    })
    res.redirect(`/${blog._id}`);

})

module.exports = router;