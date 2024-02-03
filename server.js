import http from 'http';


const server = http.createServer((req, res) => {
    console.log('request made');
});

server.listen(5999, 'localhost', () => {
    console.log('listening for requests on port 5999');
})

