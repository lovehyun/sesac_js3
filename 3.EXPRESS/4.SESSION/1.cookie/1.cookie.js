const http = require('http');

const server = http.createServer((req, res) => {
    console.log(req.url, req.headers);
    res.writeHead(200, {'Set-cookie': 'mycookie=test1234'});
    res.end('hello');
});

server.listen(3000, () => {
    console.log('서버 대기중');
});
