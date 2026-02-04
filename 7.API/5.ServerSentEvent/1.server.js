const express = require('express');
const path = require('path');

const app = express();

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', '1.index.html'));
});

app.get('/events', (req, res) => {
    // SSE 헤더 설정
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    console.log('요청옴..');

    const sendTime = () => {
        // 웹 표준 : 서버로부터 데이터가 올때의 포멧이.. data: 내용물\n\n
        // HTML 명세의 9.2.4 Parsing an event stream
        res.write(`data: 서버로부터 온 시간: ${new Date().toISOString()}\n\n`);
    }

    const interval = setInterval(sendTime, 2000); // 매초 시간 정보 보내기...

    // 여기에 온 요청은... 종료되지 않고, 계속 대기...

    // 연결이 종료되면? 클라이언트가 창 닫으면..
    req.on('close', () => {
        console.log('클라이언트가 떠나서 타이머 종료:', interval);
        clearInterval(interval); // 기존 주기적 전송 타이머 제거
    });
});

app.listen(3000, () => {
    console.log('서버 레디...');
});
