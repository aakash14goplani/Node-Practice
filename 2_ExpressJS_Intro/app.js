const express = require('express');

const app = express();
app.use('/', (req, res, next) => {
    console.log('middle-ware-1');
    // res.send('Hello from middle-ware-1');
    next(); // jumps to next middleware else request dies
});
app.use('/aakash', (req, res, next) => {
    console.log('middle-ware-2');
    // send response before next() call
    res.send('Hello from middle-ware-2');
});


app.listen(4200, 'localhost');