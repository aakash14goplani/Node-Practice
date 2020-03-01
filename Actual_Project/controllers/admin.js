const Product = require('../models/product');

exports.getAddProducts = (req, res, next) => {
    res.render('admin/edit-product', { 
        title: 'Add Product', 
        path: '/admin/add-product',
        editing: false
    });
}

exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    if (!editMode) {
        res.redirect('/');
    }
    const productId = req.params.productId;
    /* filesystem approach
    Product.findProductById(productId, product => {
        if (!product) {
            res.redirect('/');
        }
        res.render('admin/edit-product', { 
            title: 'Edit Product', 
            path: '/admin/edit-product',
            editing: editMode,
            product: product
        });
    }); */
    /* sequelize approach */
    req.user.getProduct_sequelizes({where: {id: productId}})
    // Product.findByPk(productId)
    .then(products => {
        const product = products[0];
        res.render('admin/edit-product', { 
            title: 'Edit Product', 
            path: '/admin/edit-product',
            editing: editMode,
            product: product
        });
    })
    .catch(error => {
        console.log('Error in Shop controller while fetchung product with id sequelly');
    });
}

exports.postEditProduct = (req, res, next) => {
    const id = req.body.productId;
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const description = req.body.description;
    const price = req.body.price;
    /* filesystem approach
    const updatedProduct = new Product(id, title, imageUrl, description, price);
    updatedProduct.save(); */

    /* sequelize approach */
    Product.findByPk(id)
    .then(product => {
        product.title = title;
        product.price = price;
        product.description = description;
        product.imageUrl = imageUrl;
        return product.save();
    })
    .then(results => {
        res.redirect('/admin/products');
    })
    .catch(error => {
        console.log('Error in Admin controller while saving edited data sequelly using sequelize', error);
    });
}

exports.postAddProducts = (req, res, next) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;

    /* filesystem approach
    const product = new Product(null, title, imageUrl, description, price);
    product.save(); */

    /* mysql2 method
    product.saveDataSequelly()
    .then(() => {
        res.redirect('/');
    })
    .catch(error => {
        console.log('Error in Admin controller while saving data sequelly')
    }); */

    /* sequelize approach */
    /* available methods
    getProduct_sequelizes
    countProduct_sequelizes
    hasProduct_sequelize
    hasProduct_sequelizes
    setProduct_sequelizes
    addProduct_sequelize
    addProduct_sequelizes
    removeProduct_sequelize
    removeProduct_sequelizes
    createProduct_sequelize */
    req.user.createProduct_sequelize({
        title,
        price,
        description,
        imageUrl
    })
    .then(results => {
        res.redirect('/admin/products');
    })
    .catch(error => {
        console.log('Error in Admin controller while saving data sequelly using sequelize', error);
    });
}

exports.getProducts = (req, res, next) => {
    /* mysql approach
    Product.fetchAll((product) => {
        res.render('admin/products', { 
            prods: product, 
            title: 'Admin Products', 
            path: '/admin/products'
        });
    }); */

    /* sequelize approach */
    req.user.getProduct_sequelizes()
    // Product.findAll()
    .then(products => {
        res.render('admin/products', { 
            prods: products, 
            title: 'Admin Products', 
            path: '/admin/products'
        });
    })
    .catch(errors => {
        console.log('Error in Admin controller while saving data sequelly using sequelize', errors)
    });
};

exports.postDeleteProduct = (req, res, next) => {
    const productId = req.body.productId;
    // Product.deleteById(productId);
    Product.findByPk(productId)
    .then(product => {
        return product.destroy();
    })
    .then(results => {
        res.redirect('/admin/products');
    })
    .catch(error => {
        console.log('Error in Admin controller while deleting data sequelly using sequelize', error);
    });
}
