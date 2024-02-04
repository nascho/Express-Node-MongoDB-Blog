const express = require('express');



/*-----
express app
-----*/
const app = express();

/*-----
listen for requests
-----*/
app.listen(5999);

/*-----
routing
-----*/
app.get('/', (req, res) => {
    // res.send('<h1>Home page - using Express now</h1>');
    res.sendFile('./views/index.html', { root: __dirname });
})

app.get('/about', (req, res) => {
    // res.send('<h1>about page</h1>');
    res.sendFile('./views/about.html', { root: __dirname });
})

/*-----
routing redirects
-----*/
app.get('/about-us', (req, res) => {
    res.redirect('./about');
})

/*-----
404
-----*/
app.use((req, res) => {
    res.status(404).sendFile('./views/404.html', { root: __dirname });
})