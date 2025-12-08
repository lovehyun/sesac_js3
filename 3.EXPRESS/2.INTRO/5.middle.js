const express = require('express');
const app = express();
const PORT = 3000;


// 미들웨어...
app.use((req, res, next) => {
    console.log("1. 내가 중간에 가로챔.. 근데, 널 보니 로그인 안했구나??");
    // res.send('로그인부터 하고 오세요.');
    next(); // 다음꺼 호출..
});

app.use((req, _, next) => {
    console.log("2. 나는 두번째 미들웨어...");
    console.log("사용자 왔다감: ", req.socket.remoteAddress);

    next(); // 또 다음꺼 호출..
});

app.use((_req, _res, next) => {
    console.log("3. 나는 세번째 미들웨어... (나는 req/res 둘다 안보고 안처리하는애)");
    next(); // 또 다음꺼 호출..
});


// 라우터들...
app.get('/', (req, res) => {
    console.log('4. 홈 라우트에 접속');
    res.send("웰컴투 마이홈");
});

app.get('/users', (req, res) => {
    console.log('사용자 라우트에 접속');
    res.send("웰컴투 사용자들의 홈");
});

app.listen(PORT, () => {
    console.log(`Server is ready, http://127.0.0.1:${PORT}`);
});

