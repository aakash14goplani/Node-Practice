const express = require('express');
const router = express.Router();
const path = require('path');
const rootDiectory = require('../util/path');

router.use('/', (request, response, next) => {
    /* response.status(404).send(`
        <h2>Page Not found</h2>
        <form action='/home' method="POST">
            <button type="submit">Back to Home Page</button>
        </form>
    `); */

    // response.sendFile(path.join(rootDiectory,  'views', '404.html'));
    response.status(404).render('404', { 
        title: '404 Error', 
        // layout: false 
    } );
});

module.exports = router;