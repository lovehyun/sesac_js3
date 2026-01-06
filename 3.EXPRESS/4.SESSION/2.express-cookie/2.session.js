const express = require('express');
const session = require('express-session');

const app = express();
const port = 3000;

// 세션을 연동 - 세션은 서버에 저장 (메모리에 저장) - 정할수 있음 (disk, db, memory)
app.use(session({
    secret: 'my-secret-key', // 서버에서 나만 알고 있는 비밀키
    resave: false, // 세션 데이터에 변경이 없어도 저장하겠다 (false, 즉 저장 안하겠다).
    saveUninitialized: true // 내용이 없어도, 초기화가 안된 빈 세션도 일단 저장하겠다.
}));

function visitCounter(req, res, next) {
    req.session.visitCount = req.session.visitCount || 0; // 있으면 앞에꺼, 없으면 뒤에꺼.
    // 사용자의 방문 횟수 증가
    req.session.visitCount++;
    console.log('이 사용자의 방문 횟수는: ', req.session);
    next();
}

app.use(visitCounter);

app.get('/', (req, res) => {
    req.session.username = 'user1';
    req.session.cart = ['사과우유', '딸기우유', '바나나우유'];

    res.send(`당신의 방문 횟수는 ${req.session.visitCount} 입니다.`);

    // res.send('hello');
});

app.get('/user', (req, res) => {
    const { username, cart } = req.session;
    console.log(username, cart);
    res.send(`당신은 ${username} 이군요. 반갑습니다.`);
});

app.get('/shop', (req, res) => {
    const { username, cart } = req.session;
    console.log(username, cart);
    res.send(`당신은 ${username} 이고, 여기는 OOO 쇼핑몰입니다. 장바구니에 ${cart} 를 담았었군요.`);
});

app.listen(port, () => {
    console.log('서버 레디');
});
