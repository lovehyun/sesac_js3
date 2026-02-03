// npm install ws
const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8000 });

// 암기해야하는 문법 .on
wss.on("connection", (ws) => {
    console.log('클라이언트 연결됨');

    ws.on("message", (msg) => {
        console.log("클라이언트 메시지:", msg.toString());

        ws.send(`서버: ${msg}`);
    })
});

console.log("웹소켓 서버 실행중... ws://localhost:8000");
