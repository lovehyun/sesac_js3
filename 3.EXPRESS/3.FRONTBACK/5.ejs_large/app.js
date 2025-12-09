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

app.get('/fruits', (req, res) => {
    const fruits = ['사과', '바나나', '오렌지', '포도'];
    res.render('fruits', { fruits: fruits })
});

app.get('/welcome', (req, res) => {
    const isAdmin = false;

    if (isAdmin) {
        username = "관리자";
    } else {
        username = "홍길동";
    }

    // res.render('welcome', { username: username });
    res.render('welcome', { username }); // 축약문법 (알아서 자동으로 username 이라는 키에 username의 값을 할당함.)
});

app.listen(PORT, () => {
    console.log('서버 레디');
});
