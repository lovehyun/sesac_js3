// npm install ws express
const WebSocket = require('ws');
const express = require('express');
const path = require('path');

const app = express();

const express_port = 3000;
const websocket_port = 3333;

const wss = new WebSocket.Server({ port: websocket_port });

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'client.html'));
});

// 웹소켓으로 받은 메시지 다 전달(브로드캐스트)
wss.on("connection", (ws) => {
    ws.on("message", (msg) => {
        let content = '';
        try {
            const parsedMsg = JSON.parse(msg);
            content = parsedMsg.content;
        } catch(error) {
            console.error('Invalid JSON Format: ', error);
            return;
        }

        wss.clients.forEach((client) => {
            const messageType = client === ws ? 'sent' : 'received';
            const messageObj = { type: messageType, content: content };
            client.send(JSON.stringify(messageObj));
        })
    })
});

console.log(`웹소켓 서버 실행중... ws://localhost:${websocket_port}`);
app.listen(express_port, () => {
    console.log(`익스프레스 서버 실행중... http://localhost:${express_port}`);
});
