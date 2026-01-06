const express = require('express');
const session = require('express-session');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.json());
// app.use(express.urlencoded({extended: false}));

app.use(session({
    secret: 'this-is-my-secret-password',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 60000, // 세션의 유효 시간을 60000ms = 60s = 1분
    }
}));

app.use(express.static('public'));

// 간단한 메모리 기반의 사용자DB
const users = [
    {id: 1, username: 'user1', password: 'password1'},
    {id: 2, username: 'user2', password: 'password2'}
];

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/profile', (req, res) => {
    const { user } = req.session; // 이전에 세션에 저장한 정보 다시 찾아오기

    if (user) {
        res.json({ id: user.id, username: user.username, message: "프로필 정보"});
    } else {
        res.status(401).json({ message: "로그인이 필요합니다."});
    }
});

app.get('/check-login', (req, res) => {
    if (req.session && req.session.user) { // 로그인 세션이 유효함
        return res.json({ id: req.session.user.id, username: req.session.user.username })
    }
    return res.json({ username: null }); // 로그인 세션이 없음
})

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    console.log(`사용자 입력값 확인: ${username}, ${password}`);

    // 사용자 로그인 확인 하는 코드 구현 - legacy
    // let user = null;
    // for (let i = 0; i < users.length; i++) {
    //     if (users[i].username == username && users[i].password == password) {
    //         user = users[i];
    //         break;
    //     }
    // }

    // 사용자 로그인 확인 하는 코드 구현 - modern
    // https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/find
    const user = users.find((u) => u.username === username && u.password === password);

    if (user) {
        req.session.user = { id: user.id, username: user.username }; // 내가 원하는 내용을 세션에 담기
        res.json({ message: '로그인 성공'});
    } else {
        res.status(401).json({ message: '로그인 실패'});
    }
});

app.get('/logout', (req, res) => {
    // req.session.destroy();  // 이렇게만 해도 됨.

    req.session.destroy((err) => {
        if (err) {
            console.error("세션 삭제 실패", err);
            return res.status(500).json({ message: "로그아웃 실패"});
        }
        res.json({ message: "로그아웃 성공"});
    });
});

app.listen(port, () => {
    console.log('서버 레디');
});
