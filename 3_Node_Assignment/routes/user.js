const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const path = require('path');
const rootDiectory = require('../util/path');

const userDetails = [];

router.use(bodyParser.urlencoded({extended: false}));

router.use('/', (request, response, next) => {
    /* response.send(`
        <h2>User Details</h2>
        <form action='/home' method="POST">
            <button type="submit">Back to Home Page</button>
        </form>
    `); */

    if (request.body.username) {
        userDetails.push( { name: request.body.username } );
    }

    // response.sendFile(path.join(rootDiectory,  'views', 'user.html'));
    response.status(200).render('user', { 
        user: userDetails, 
        title: 'USER DETAILS', 
        // layout: false,
        hasUsers: userDetails.length > 0
    } );
});

// module.exports = router;
exports.route = router;
exports.user = userDetails;