// npm i ejs

const express = require('express');
const app = express();
const PORT = 3000;

// 서버 사이드 랜더링을 하기 위한 라이브러리 설정
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    const data = {
        title: '내 타이틀2', message: '분할된 헤더와 메인 합치기'
    }

    res.render('main', data);
});

app.get('/user', (req, res) => {
    const data = {
        title: '사용자 페이지', message: '분할된 헤더와 또다른 메인 합치기'
    }

    res.render('user', data);
});


app.listen(PORT, () => {
    console.log('서버 레디');
});
