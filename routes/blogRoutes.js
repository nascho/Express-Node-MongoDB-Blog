const express = require('express');
const Blog = require('../models/blog');


const router = express.Router();

router.get('/', (req, res) => {
    Blog.find().sort({ createdAt: -1 })
        .then(resolve => {
            res.render('index', { title: 'All Blogs', blogs: resolve})
        })
        .catch(err => {
            console.log(err);
        })
})

router.post('/', (req, res) => {
    const blog = new Blog(req.body);

    blog.save()
        .then(resolve => {
            res.redirect('/blogs');   
        })
        .catch(err => {
            console.log(err);
        })
})

router.get('/create', (req, res) => {
    res.render('create', { title: 'Create a new blog'});
})

router.get('/:id', (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
        .then(resolve => {
            res.render('details', { blog: resolve, title: 'Blog Details'});
        })
        .catch(err => {
            console.log(err);
        })
})

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
        .then(resolve => {
            res.json({ redirect: '/blogs' });
        })
        .catch(err => {
            console.log(err);
        })
})


module.exports = router;