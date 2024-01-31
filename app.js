require('dotenv').config();

// basic express server
const express = require('express');
const expressLayout = require('express-ejs-layouts');

const app = express();
const PORT = 5999 || process.env.PORT;

app.use(express.static('public'));

// ejs templating engine
app.use(expressLayout);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

app.use('/', require('./server/routes/main.js'));

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
})