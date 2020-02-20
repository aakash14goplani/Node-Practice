const Product = require('../models/product');

exports.getProducts = (req, res, next) => {
    Product.fetchAll((product) => {
        res.render('shop/product-list', { 
            prods: product, 
            title: 'All Products', 
            path: '/'
        });
    });
};

exports.getIndex = (req, res, next) => {
    Product.fetchAll((product) => {
        res.render('shop/index', { 
            prods: product, 
            title: 'Index', 
            path: '/'
        });
    });
};

exports.getCart = (req, res, next) => {
    Product.fetchAll((product) => {
        res.render('shop/cart', { 
            prods: product, 
            title: 'Cart', 
            path: '/cart'
        });
    });
};

exports.getOrders = (req, res, next) => {
    Product.fetchAll((product) => {
        res.render('shop/orders', { 
            prods: product, 
            title: 'Your Orders', 
            path: '/orders'
        });
    });
};

exports.getCheckout = (req, res, next) => {
    Product.fetchAll((product) => {
        res.render('shop/checkout', { 
            prods: product, 
            title: 'Checkout', 
            path: '/checkout'
        });
    });
};
