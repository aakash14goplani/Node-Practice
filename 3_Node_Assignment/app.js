const express = require('express');
const app = express();
const path = require('path');

const userData = require('./routes/user');
const homeData = require('./routes/home');
const pageNotFound = require('./routes/404');

const rootDiectory = require('./util/path');

/* const expressHandlebars = require('express-handlebars');
app.engine('hbs', expressHandlebars({
    defaultLayout: 'main-layout',
    layoutsDir: 'views/layouts/',
    extname: 'hbs'
})); */

// app.set('view engine', 'pug');
// app.set('view engine', 'hbs');
app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static(path.join(rootDiectory, 'public')));

app.use('/home', homeData);
app.post('/user', userData.route);
app.use('/', pageNotFound);

app.listen(4200, 'localhost');
