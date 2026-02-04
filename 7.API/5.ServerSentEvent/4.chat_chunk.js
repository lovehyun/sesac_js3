const express = require('express');
const path = require('path');

const app = express();

app.use(express.static('public'));
app.use(express.json());

const clients = []; // 연결된 사용자 관리
const messages = [];

messages.push({username: '시스템', message: '채팅을 시작합니다'});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', '4.chat_chunk.html'));
});

app.get('/chat', (req, res) => {
    // SSE 헤더 설정
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    clients.push(res);
    console.log('새로운 사용자에게 응답을 보낼 준비 완료');

    messages.forEach(msg => {
        res.write(`data: ${JSON.stringify(msg)}\n\n`);
        // messages.pop();
    });
});

app.post('/send-message', (req, res) => {
    const { username, message } = req.body;
    const timestamp = new Date().toLocaleTimeString()
    const newMessage = { username, message, timestamp };

    messages.push(newMessage);

    const id = Date.now().toString() + '-' + Math.floor(Math.random() * 10000);

    // 한번에 왕창 보내지 않고.. 글자 단위로 보내기...
    let index = 0;
    const interval = setInterval(() => {
        if (index < message.length) {
            const char = message[index]; // 이번에 보낼 '한' 글자

            const payload = {
                id,
                username,
                chunk: char,
                timestamp,
                isStreaming: index < message.length - 1  // 마지막 글자여부
            };

            clients.forEach(client => {
                client.write(`data: ${JSON.stringify(payload)}\n\n`);
            });

            index++;
        } else {
            clearInterval(interval);
        }
    }, 100); // 100ms 단위로 한글자씩..

    res.status(200).send({ success: true });
});

app.listen(3000, () => {
    console.log('서버 레디...');
});
