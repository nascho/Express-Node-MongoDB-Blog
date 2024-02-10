require('dotenv').config();
const express = require('express');
const blogRoutes = require('./routes/blogRoutes');
const morgan = require('morgan');
const mongoose = require('mongoose');


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

/*----- 
blog routes
-----*/
app.use('/blogs', blogRoutes);

/*-----
404
-----*/
app.use((req, res) => {
    res.status(404).render('404', { title: '404'});
})
