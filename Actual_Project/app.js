const path = require('path');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const adminRoutes = require('./routes/admin');
const shoppingRoutes = require('./routes/shop');
const rootDirectory = require('./util/path');
const mongoConnect = require('./util/nosql_database');
const sequelize = require('./util/sql_database');

const Product = require('./models/product');
const User = require('./models/user');
const errorController = require('./controllers/error');
const Cart = require('./models/cart_sequelize');
const CartItem = require('./models/cart-item');

app.set('views', path.join(rootDirectory, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(rootDirectory, 'public')));

app.use((req, res, next) => {
    User.findByPk(1)
    .then(user => {
        req.user = user;
        next();
    })
    .catch(error => {
        console.log('unable to find user in middleware: ', error)
    });
});

app.use('/admin', adminRoutes);
app.use(shoppingRoutes);
app.use(errorController.get404);

Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });

// sequelize.sync({force: true})
sequelize.sync()
.then(result => {
    return User.findByPk(1);
})
.then(user => {
    if (!user) {
        User.create({ name: 'test', email: 'test@test.test' });
    }
    // else return user, but not an object, return user as a promise so that we can use .then() on it
    return Promise.resolve(user);
})
.then(user => {
    return user.createCart();
})
.then(cart => {
    app.listen(4200, 'localhost');
})
.catch(error => {
    // console.log('Error in creating sequelize table in app.js', error);
});

// app.listen(4200, 'localhost');

/* mongoConnect(client => {
    console.log('client status: ', client);
    app.listen(4200, 'localhost');
}); */
