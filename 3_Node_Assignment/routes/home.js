const express = require('express');
const router = express.Router();
const path = require('path');
const rootDiectory = require('../util/path');

router.use('/', (request, response, next) => {
    /* response.send(`
        <h2>Home Page</h2>
        <form action='/user' method="POST">
            User Name: <input type='text' name='username'>
            <button type="submit">Get User Details</button>
        </form>
    `); */

    // response.sendFile(path.join(rootDiectory,  'views', 'home.html'));
    response.status(200).render('home', { 
        title: 'HOME', 
        // layout: false 
    } );
});

module.exports = router;