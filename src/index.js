const express = require('express');
const morgan = require('morgan');
var favicon = require('serve-favicon');


const path = require('path');

// intializations
const app = express();
require('./database');

// settings
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('port', process.env.PORT || 3000);

// middlewares

app.use(express.static("public"))
app.use(express.urlencoded({extended: false}));
//app.use('/favicon.ico', express.static('img/favicon.ico'));
//app.use(favicon(path.join(__dirname, 'public', 'img', 'favicon.ico')));
// Global variables
/*app.use((req, res, next) => {
    app.locals.format = format;
    next();
});*/

// routes
app.use(require('./routes/index'));

// static files
app.use(express.static(path.join(__dirname, 'public')));

// start
app.listen(3000, () => {
    console.log(`Server on port ${app.get('port')}`);
});