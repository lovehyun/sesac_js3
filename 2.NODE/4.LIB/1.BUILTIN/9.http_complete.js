const http = require('http');

const server = http.createServer();

server.on('connection', () => {
    console.log('TCP 연결이 시작되었습니다.');
});

server.on('request', (req, res) => {
    console.log('HTTP 요청이 시작되었습니다.');
    // res.writeHead(200, { 'Content-Type': 'text/plain' }); // 나의 응답
    res.writeHead(200, { 'Content-Type': 'text/html' }); // 나의 응답
    // res.end('Hello, HTTP Server!');
    res.end('<meta charset="utf-8"><H1>안녕</H1><H2>Heading2</H2>');
});

console.log('서버는 사실 여기에서 시작되었습니다.');
server.listen(3000);  // 서버의 대기상태에 들어가서...
console.log('나는 언제 찍힐까요?');
