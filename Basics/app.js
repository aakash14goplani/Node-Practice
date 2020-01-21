const http = require('http');

function requestListenerFn(request, response) {
    // ...
}

/* http.createServer(requestListenerFn);

http.createServer(function(req, res) {
    // ...
}); */

const server = http.createServer((req, res) => {
    console.log('req url :', req.url);
    console.log('res headers :', req.headers);
    console.log('req method :', req.method);
    /* console.log('res :', res);
    console.log('req :', req); */
    process.exit();
});
server.listen(4200, 'localhost');