const express = require('express');
const Database = require('better-sqlite3');
const path = require('path');

const app = express();
const port = 3000;
const db = new Database('users.db');

// db 초기화
(() => {
    db.exec('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT)');

    const insertStm = db.prepare('INSERT INTO users (username, password) VALUES (?, ?)');
    const users = [
        { username: 'user1', password: 'pass1' },
        { username: 'user2', password: 'pass2' },
        { username: 'user3', password: 'pass3' },
    ];
    // 한번만 넣고 그만 넣자...
    // for (const user of users) {
    //     insertStm.run(user.username, user.password);
    // }
})();

// 미들웨어 - 바디파서 (urlencoded vs json 의 차이를 꼭 이해할것)
app.use(express.urlencoded({extended: false}));

app.get('/', (req, res) => {
    res.sendFile(path.resolve('public/index.html'));
    // res.send()
    // res.json()
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // 이걸 dB에서 조회하기.. 결과에 따라...
    const selectStm = db.prepare("SELECT * FROM users WHERE username=? AND password=?");
    const result = selectStm.get(username, password);
    console.log(result);

    if (result) {
        res.send("로그인 성공");
    } else {
        res.send("로그인 실패");
    }
});

app.listen(port, () => {
    console.log('서버 레디...');
});
