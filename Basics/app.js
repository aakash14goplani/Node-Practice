const http = require('http');

function requestListenerFn(request, response) {
    // ...
}

/* http.createServer(requestListenerFn);

http.createServer(function(req, res) {
    // ...
}); */

const server = http.createServer((req, res) => {
    console.log('req :', req);
    console.log('res :', res);
});
server.listen(4200, 'localhost');