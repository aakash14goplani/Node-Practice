const path = require('path');

const express = require('express');

const router = express.Router();

const rootDirectory = require('../util/path');
const adminData = require('./admin');

router.get('/', (req, res, next) => {
    /* send raw HTML -> replacing this with sending HTML file
    res.send(`
        <html>
            <head><title>Shop Products</title></head>
            <body>
                <h2>Shop Products</h2>
                <a href="/admin/add-product">Begin Shopping</a>
            </body>
        </html>
    `); */
    // res.sendFile(path.join(__dirname, '../', 'views', 'shop.html'));
    console.log('Data from shop.js: ', adminData.product);
    // res.sendFile(path.join(rootDirectory, 'views', 'shop.html'));
    res.render(
        'shop', 
        { 
            prods:adminData.product, 
            title: 'My Shop', 
            path: '/', 
            hasProducts: adminData.product.length > 0,
            activeShop: true,
            formsCSS: false,
            productCSS: true
            /*, layout: false */
        }
    );
});

module.exports = router;
