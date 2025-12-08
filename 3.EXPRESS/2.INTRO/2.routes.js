const express = require('express');
const app = express();
const PORT = 3000;    // 보통 상수는 대문자로 함

app.get('/', (req, res) => {
    res.send("나의 루트");
});

app.get('/product', (req, res) => {
    res.send("나의 상품");
});

app.get('/user', (req, res) => {
    res.send("나의 고갱님");
});

// 아래처럼 모든걸 GET으로 해서 CREATE, MODIFY, DELETE 등등 URL명으로 하는것은 가장 나쁜 원칙임
// /user/create, user/delete
// /createUser, deleteUser
app.get('/user/create', (req, res) => {
    res.send("나의 신규 고갱님 생성");
});

app.get('/user/modify', (req, res) => {
    res.send("나의 고갱님 정보 수정");
});

app.get('/user/delete', (req, res) => {
    res.send("나의 고갱님 삭제");
});

app.listen(PORT, () => {
    console.log(`Server is ready at http://127.0.0.1:${PORT}/`);
});
