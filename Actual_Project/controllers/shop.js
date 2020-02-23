const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
    Product.fetchAll((product) => {
        res.render('shop/product-list', { 
            prods: product, 
            title: 'All Products', 
            path: '/'
        });
    });
};

exports.getProduct = (req, res, next) => {
    const productId = req.params.productId;
    Product.findProductById(productId, product => {
        res.render('shop/product-detail', {
            product: product, 
            title: product.title, 
            path: '/products'
        });
    });
    // res.redirect('/');
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
    Cart.getCart(cart => {
        Product.fetchAll(products => {
            const cartProducts = [];
            for (product of products) {
                const cartProductData = cart.products.find(prod => prod.id === product.id);
                if (cartProductData) {
                    cartProducts.push({ productData: product, qty: cartProductData.qty });
                }
            }
            res.render('shop/cart', {
                path: '/cart',
                title: 'Your Cart',
                products: cartProducts
            });
        });
    });
};

exports.postCart = (req, res, next) => {
    const productId = req.body.productId;
    Product.findProductById(productId, (product) => {
        Cart.addProduct(productId, product.price);
        /* res.render('shop/cart', { 
            prods: product, 
            title: 'Cart', 
            path: '/cart'
        }); */
    });
    res.redirect('/');
};

exports.postCartDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findProductById(prodId, product => {
        Cart.deleteProduct(prodId, product.price);
        res.redirect('/cart');
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
