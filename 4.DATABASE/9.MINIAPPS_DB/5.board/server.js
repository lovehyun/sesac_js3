const express = require('express')
const Database = require('./database');

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('public'));

const db = new Database();

app.get('/api/list', (req, res) => {
    console.log('목록 조회');
    // 비즈로직 구현
    res.send('목록 조회');
});

app.post('/api/create', (req, res) => {
    console.log('글 작성');
    // 비즈로직 구현
    const sql = 'INSERT INTO board(title, message) VALUES(?, ?)'
    db.execute(sql, [title, message]);

    res.json({ 'result': 'success' });
    // res.send('글 작성');
});

app.delete('/api/delete', (req, res) => {
    console.log('글 삭제');
    // 비즈로직 구현
    res.send('글 삭제');
});

app.modify('/api/modify', (req, res) => {
    console.log('글 수정');
    // 비즈로직 구현
    res.send('글 수정');
});

app.listen(port, () => {
    console.log('서버 레디');
});
