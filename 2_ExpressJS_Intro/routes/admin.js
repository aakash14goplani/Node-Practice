const path = require('path');

const express = require('express');

const bodyParser = require('body-parser');

const router = express.Router();

const rootDirectory = require('../util/path');

const products = [];

router.get('/add-product', (req, res, next) => {
    /* send raw HTML -> replacing this with sending HTML file
    res.send(`
        <html>
            <head><title>Add Product</title></head>
            <body>
                <form method="POST" action="/admin/product">
                    Product Name: <input type="text" name="productName">
                    <button type="submit">Submit</button>
                </form>
            </body>
        </html>
    `); */

    // res.sendFile(path.join(__dirname, '../', 'views', 'add-product.html'));
    res.sendFile(path.join(rootDirectory, 'views', 'add-product.html'));
});

router.use(bodyParser.urlencoded({extended: false}));

router.post('/product', (req, res, next) => {
    console.log('Product Added: ', req.body.title);
    products.push( { title : req.body.title} );
    res.redirect('/');
});

// module.exports = router;

exports.route = router;
exports.product = products;
