const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
    /* file system
    Product.fetchAll((product) => {
        res.render('shop/product-list', { 
            prods: product, 
            title: 'All Products', 
            path: '/'
        });
    }); */
    
    /* using mysql2
    Product.fetchAllSequelly()
    .then(([row, fieldData]) => {
        res.render('shop/product-list', { 
            prods: row, 
            title: 'All Products', 
            path: '/products'
        });
    })
    .catch(error => {
        console.log('Error in Shop controller while fetchung all data sequelly');
    }); */

    /* using sequelize */
    Product.findAll()
    .then((products) => {
        res.render('shop/index', { 
            prods: products, 
            title: 'Index', 
            path: '/products'
        });
    })
    .catch(error => {
        console.log('Error in Shop controller while fetching all data sequelly');
    });
};

exports.getProduct = (req, res, next) => {
    const productId = req.params.productId;
    if (productId) {
        /* using mysql2
        Product.findProductByIdSequelly(productId)
        .then(([row, fieldData]) => {
            res.render('shop/product-detail', {
                product: row[0], 
                title: row[0].title, 
                path: '/products'
            });
        })
        .catch(error => {
            console.log('Error in Shop controller while fetchung product with id sequelly');
        }); */

        /* using sequelize
        Product.findByPk(productId)
        .then(product => {
            res.render('shop/product-detail', {
                product: product, 
                title: product.title, 
                path: '/products'
            });
        })
        .catch(error => {
            console.log('Error in Shop controller while fetchung product with id sequelly');
        }); */

        Product.findAll({ where: {id: productId} })
        .then(products => {
            res.render('shop/product-detail', {
                product: products[0], 
                title: products[0].title, 
                path: '/products'
            });
        })
        .catch(error => {
            console.log('Error in Shop controller while fetchung product with id sequelly');
        });
    }
    /* using file system
    Product.findProductById(productId, product => {
        res.render('shop/product-detail', {
            product: product, 
            title: product.title, 
            path: '/products'
        });
    }); */
    // res.redirect('/');
};

exports.getIndex = (req, res, next) => {
    /* using file-system
    Product.fetchAll((product) => {
        res.render('shop/index', { 
            prods: product, 
            title: 'Index', 
            path: '/'
        });
    }); */

    /* using mysql2
    Product.fetchAllSequelly()
    .then(([row, fieldData]) => {
        res.render('shop/index', { 
            prods: row, 
            title: 'Index', 
            path: '/'
        });
    })
    .catch(error => {
        console.log('Error in Shop controller while fetching all data sequelly');
    });  */

    /* using sequelize */
    Product.findAll()
    .then((products) => {
        res.render('shop/index', { 
            prods: products, 
            title: 'Index', 
            path: '/'
        });
    })
    .catch(error => {
        console.log('Error in Shop controller while fetching all data sequelly');
    });
};

exports.getCart = (req, res, next) => {
    /* filesystem approach
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
    }); */
    /* sequelize approach */
    req.user.getCart()
    .then(cart => {
        return cart.getProduct_sequelizes();
    })
    .then(products => {
        res.render('shop/cart', {
            path: '/cart',
            title: 'Your Cart',
            products: products
        });
    })
    .catch(error => {
        console.log('Error fetching details from cart in shop controller: ', error);
    });
};

exports.postCart = (req, res, next) => {
    const productId = req.body.productId;
    let fetchedCart;
    let newQuantity = 1;

    for(let i in req.user) {
        console.log(i);
    }
    
    /* sequelize approach */
    req.user.getCart()
    .then(cart => {
        console.log('cart: ', cart);
        fetchedCart = cart;
        return cart.getProduct_sequelizes({ where: { id: productId }});
    })
    .then(products => {
        let product = (products.length > 0) ? products[0] : null;
        if (product) {
            const oldQuantity = product.cartItem.quantity;
            newQuantity = oldQuantity + 1;            
        }
        return Product.findByPk(productId);
    })
    .then(product => {
        return fetchedCart.addProduct_sequelizes(product, {
            through: { quantity: newQuantity }
        });
    })
    .then(() => {
        res.redirect('/cart');
    })
    .catch(error => {
        console.log('Error adding products to cart in shop controller: ', error);
    });

    /* filesystem approach */
    // Product.findProductById(productId, (product) => {
    //     Cart.addProduct(productId, product.price);
    //     /* res.render('shop/cart', { 
    //         prods: product, 
    //         title: 'Cart', 
    //         path: '/cart'
    //     }); */
    // });
};

exports.postCartDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    /* sequelize approach */
    req.user.getCart()
    .then(cart => {
        return cart.getProduct_sequelizes({ where: { id: prodId } });
    })
    .then(products => {
        const product = products[0];
        return product.cartItem.destroy();
    })
    .then(result => {
        res.redirect('/cart');
    })
    .catch(error => {
        console.log('Error deleting products from cart in shop controller: ', error);
    });
    /* file system approach
    Product.findProductById(prodId, product => {
        Cart.deleteProduct(prodId, product.price);
        res.redirect('/cart');
    }); */
};

exports.getOrders = (req, res, next) => {
    /* file system approach
    Product.fetchAll((product) => {
        res.render('shop/orders', { 
            prods: product, 
            title: 'Your Orders', 
            path: '/orders'
        });
    }); */

    /* sequelize approach */
    req.user
    .getOrders({include: ['product_sequelizes']})
    .then(orders => {
        res.render('shop/orders', {
            path: '/orders',
            title: 'Your Orders',
            orders: orders
        });
    })
    .catch(err => console.log(err));
};

exports.postOrders = (req, res, next) => {
    let fetchedCart;
    req.user.getCart()
    .then(cart => {
        fetchedCart = cart;
        return cart.getProduct_sequelizes();
    })
    .then(products => {
        return req.user
        .createOrder()
        .then(order => {
            return order.addProduct_sequelizes(
                products.map(product => {
                    product.orderItem = { quantity: product.cartItem.quantity };
                    return product;
                })
            );
        })
        .catch(error => console.log(error));
    })
    .then(result => {
        return fetchedCart.setProduct_sequelizes(null);
    })
    .then(result => {
        res.redirect('/orders');
    })
    .catch(error => {
        console.log('Error adding details to order in shop controller: ', error);
    });
}

exports.getCheckout = (req, res, next) => {
    Product.fetchAll((product) => {
        res.render('shop/checkout', { 
            prods: product, 
            title: 'Checkout', 
            path: '/checkout'
        });
    });
};
