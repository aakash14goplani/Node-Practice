const path = require('path');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const adminRoutes = require('./routes/admin');
const shoppingRoutes = require('./routes/shop');
const rootDirectory = require('./util/path');
const mongoConnect = require('./util/nosql_database');
const sequelize = require('./util/sql_database');

const errorController = require('./controllers/error');

app.set('views', path.join(rootDirectory, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(rootDirectory, 'public')));

app.use('/admin', adminRoutes);
app.use(shoppingRoutes);

app.use('/', errorController.get404);

sequelize.sync()
.then((result) => {
    // console.log('TABLE CREATED', result);
})
.catch(error  => {
    // console.log('Error in creating sequelize table in app.js', error);
});

app.listen(4200, 'localhost');

/* mongoConnect(client => {
    console.log('client status: ', client);
    app.listen(4200, 'localhost');
}); */
