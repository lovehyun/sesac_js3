const fs = require('fs');
const http = require('http');

const server = http.createServer();

// 서버가 8000 을 열고 기다린다.
// 사용자의 요청이 오면, 파일을 열어서
// 그 내용을 전달한다.

server.on('request', (req, res) => {  // 1줄로 요청 받고
    console.log('HTTP 요청이 시작되었습니다.');
    // 파일을 읽는다.

    fs.readFile('index2.html', 'utf8', (err, data) => { // 1줄로 파일 읽고
        if (err) {
            console.log("파일 읽기 실패");
            res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end('<h1>사이트가 공사중입니다.</h1>')
        } else {   
            // console.log(data);
            res.writeHead(200, { 'Content-Type': 'text/html' }); // 2줄로 응답한다
            res.end(data);     
        }
    });
});

server.listen(8000);  // 1줄 서버 열고
