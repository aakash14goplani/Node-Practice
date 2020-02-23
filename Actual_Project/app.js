const path = require('path');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const adminRoutes = require('./routes/admin');
const shoppingRoutes = require('./routes/shop');
const rootDirectory = require('./util/path');

const errorController = require('./controllers/error');

app.set('views', path.join(rootDirectory, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(rootDirectory, 'public')));

app.use('/admin', adminRoutes);
app.use(shoppingRoutes);

app.use('/', errorController.get404);

app.listen(4200, 'localhost');
