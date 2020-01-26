// create node js server on port 4200
const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    /* console.log("url: ", req.url);
    console.log('method: ', req.method);
    console.log('res status: ', res.statusCode); */

    // handle two routes '/' and '/users'
    const url = req.url;
    const method = req.method;
    if (url === '/') {
        // return some greeting
        res.write('<html>');
        res.write('<head><title>Welcome User</title></head>');
        res.write('<body>');
        res.write('<h1>Welcome User</h1>');
        res.write('<a href="/user">View Active Users List</a>');
        // create new user with name 'username'
        res.write('<h3>Create Users</h3>');
        res.write('<form action="/create-user" method="POST">');
        res.write('User Name: <input type="text" name="username">');
        res.write('<button type="submit">Create User</button>');
        res.write('</form>');
        res.write('</body>');
        res.write('</html>');
        return res.end();
    }

    if (url === '/user') {
        // return a dummy list of users
        res.write('<html>');
        res.write('<head><title>Users List</title></head>');
        res.write('<body>');
        res.write('<h1>Users List</h1>');
        res.write('<ol>');
        res.write('<li>User A</li>');
        res.write('<li>User B</li>');
        res.write('<li>User C</li>');
        res.write('</ol>');
        res.write('</body>');
        res.write('</html>');
        return res.end();
    }

    if (url === '/create-user' && method === 'POST') {
        const userData = [];
        console.log("url equals? : ", req.url);
        console.log('method: ', req.method);

        req.on('data', (chunk) => {
            userData.push(chunk);
            console.log('raw user data: ', userData);
        });
        return req.on('end', () => {
            const parsedBody = Buffer.concat(userData).toString();
            console.log('parsed user data: ', parsedBody);
            fs.writeFile('message.txt', parsedBody, (error) => {
                if (!error) {
                    res.statusCode = 302;
                    res.setHeader('Location', '/');
                    return res.end();
                } else {
                    console.log('error occured: ', error);
                }
            });
        });
    }

    // res.write('<html>');
    // res.write('<head><title>Welcome User</title></head>');
    // res.write('<body>');
    // res.write('<h1>404: Page Not Found</h1>');
    // res.write('<a href="/user">Back to home page</a>');
    // res.write('</body>');
    // res.write('</html>');
    // return res.end();
});
server.listen(4100, 'localhost');