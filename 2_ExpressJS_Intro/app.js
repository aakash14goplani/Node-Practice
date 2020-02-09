const path = require('path');

const express = require('express');

const app = express();

app.set('view engine', 'pug');
app.set('views', 'views');

const adminData = require('./routes/admin');
const shoppingRoutes = require('./routes/shop');
const rootDirectory = require('./util/path');

app.use(express.static(path.join(rootDirectory, 'public')));

app.use('/admin', adminData.route);
app.use(shoppingRoutes);

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
