const path = require('path');

const express = require('express');

const router = express.Router();

const rootDirectory = require('../util/path');

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
    console.log('__dirname: ', __dirname);
    // res.sendFile(path.join(__dirname, '../', 'views', 'shop.html'));
    res.sendFile(path.join(rootDirectory, 'views', 'shop.html'));
});

module.exports = router;
