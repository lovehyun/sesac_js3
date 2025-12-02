const http = require('http');

const server = http.createServer();

server.on('connection', () => {
    console.log('누군가의 연결이 시작되었습니다.');
});

server.on('request', () => {
    console.log('누군가의 요청이 시작되었습니다.');
});

console.log('서버는 사실 여기에서 시작되었습니다.');
server.listen(3000);  // 서버의 대기상태에 들어가서...
console.log('나는 언제 찍힐까요?');
