const path = require('path');

const express = require('express');

const adminRoutes = require('./routes/admin');
const shoppingroutes = require('./routes/shop');
const rootDirectory = require('./util/path');

const app = express();

app.use('/admin', adminRoutes);
app.use(shoppingroutes);

app.use('/', (req, res, next) => {
    /* send raw HTML -> replacing this with sending HTML file
    res.status(404).send(`
        <html>
            <head><title>404</title></head>
            <body>
                <h2>Page Not Found</h2>
                <a href="/admin/add-product">Back to Shopping Page</a>
            </body>
        </html>
    `); */
    // res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
    res.status(404).sendFile(path.join(rootDirectory, 'views', '404.html'));
});

app.listen(4200, 'localhost');
