// npm i ejs

const express = require('express');
const app = express();
const PORT = 3000;

// 서버 사이드 랜더링을 하기 위한 라이브러리 설정
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    // res.render('index', { title: '익스프레스 앱', message: 'EJS를 사용해서 서버사이드 랜더링을 합니다.' });
    res.render('index', { title: '내 타이틀', message: '내가 쓰고 싶은 메시지' });
});

app.listen(PORT, () => {
    console.log('서버 레디');
});
