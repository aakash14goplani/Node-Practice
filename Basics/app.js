const http = require('http');
const routes = require('./routes');

function requestListenerFn(request, response) {
    // ...
}

/* http.createServer(requestListenerFn);

http.createServer(function(req, res) {
    // ...
}); */

/* code with server creation + routing
const server = http.createServer((req, res) => {
    console.log('res :', res);
    console.log('req :', req);
    ... code shifted to routes.js
    // process.exit();
}); */

// seperating server creation logic from routing
// simple export - const server = http.createServer(routes);
const server = http.createServer(routes.handler); // multiple export
console.log(routes.text + ' ...');
server.listen(4200, 'localhost');