const fs = require('fs');

const routeHandling = (req, res) => {
    if (req.url === "/") {
        res.write('<html>');
        res.write('<head><title>Enter Message</title></head>');
        res.write('<body><form action="/message" method="post">');
        res.write('Enter Message: <input type="text" name="message">');
        res.write('<button type="Submit">Send Message</button>');
        res.write('</form></body>');
        res.write('</html>');
        return res.end();
    }

    if (req.url === "/message" && req.method === "POST") {
        const body = [];
        req.on('data', (chunk) => {
            console.log('chunk: ', chunk);
            body.push(chunk);
        });
        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            console.log('parsedData: ', parsedBody);
            fs.writeFile('message.txt', parsedBody.split('=')[1], (error) => {
                if (!error) {
                    res.statusCode = 302;
                    res.setHeader('Location', '/');
                    return res.end();
                } else {
                    console.log('error occured: ', error);
                }
            });
        });

        /* fs.writeFileSync('message.txt', 'sample message');
        res.statusCode = 302;
        res.setHeader('Location', '/');
        return res.end(); */
    }
    
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Aakash', 'Goplani');
    res.write('<html>');
    res.write('<head><title>Node JS Basics</title></head>');
    res.write('<body>');
    res.write('<h1>Node JS Tutorial</h1>');
    res.write('</body>');
    res.write('</html>');
    res.end();

    console.log('req url :', req.url);
    console.log('req headers :', req.headers);
    console.log('req method :', req.method);
}

// module.exports = routeHandling;

/*
    module.exports.handler = routeHandling
    module.exports.text = "text"

    module <=> exports
    exports.exports.handler = routeHandling
    exports.exports.text = "text"
*/

module.exports = {
    handler: routeHandling,
    text: 'text'
}