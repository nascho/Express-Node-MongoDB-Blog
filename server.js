import http from 'http';
import fs from 'fs';


const server = http.createServer((req, res) => {
    console.log(req.url, req.method);

    // set header content type
    // res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Content-Type', 'text/html');

    // basic routing
    let path = './views/';
    switch (req.url) {
        case '/':
            path += 'index.html';
            res.statusCode = 200;
            break;
        case '/about':
            path += 'about.html';
            res.statusCode = 200;
            break;
        // redirect    
        case '/about-me':
            res.statusCode = 301;
            res.setHeader('Location', '/about');
            res.end();
            break;
        default:
            path += '404.html'
            res.statusCode = 404;
            break;
    }

    // res.write('bonjour, mr not-console');
    // res.write('<h1>bonjour, mr not-console</h1>');
    // res.end();

    // sending html file request
    fs.readFile(path, (err, data) => {
        if (err) {
            console.log(err);
            res.end();
        } else {
            res.write(data);
            res.end();
        }
    });

});

server.listen(5999, 'localhost', () => {
    console.log('listening for requests on port 5999');
})

