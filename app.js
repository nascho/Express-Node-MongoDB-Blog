require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');


/*-----
express app
-----*/
const app = express();

/*-----
connect to mongodb
-----*/
const dbURI = process.env.MONGODB_URI;
mongoose.connect(dbURI)
    .then(resolve => app.listen(5999))
    .catch(err => console.log('db connection failed'));

/*-----
register view engine
-----*/
app.set('view engine', 'ejs');

/*-----
middleware & static files
-----*/
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

/*-----
routing + mongoose and mongodb
-----*/
app.get('/', (req, res) => {
    res.redirect('/blogs');
})

app.get('/about', (req, res) => {
    res.render('about', { title: 'About'});
})

/* blog routes */

app.get('/blogs', (req, res) => {
    Blog.find().sort({ createdAt: -1 })
        .then(resolve => {
            res.render('index', { title: 'All Blogs', blogs: resolve})
        })
        .catch(err => {
            console.log(err);
        })
})

app.post('/blogs', (req, res) => {
    const blog = new Blog(req.body);

    blog.save()
        .then(resolve => {
            res.redirect('/blogs');   
        })
        .catch(err => {
            console.log(err);
        })
})

app.get('/blogs/:id', (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
        .then(resolve => {
            res.render('details', { blog: resolve, title: 'Blog Details'});
        })
        .catch(err => {
            console.log(err);
        })
})

app.delete('/blogs/:id', (req, res) => {
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
        .then(resolve => {
            res.json({ redirect: '/blogs' });
        })
        .catch(err => {
            console.log(err);
        })
})

app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'Create a new blog'});
})

/*-----
404
-----*/
app.use((req, res) => {
    res.status(404).render('404', { title: '404'});
})
