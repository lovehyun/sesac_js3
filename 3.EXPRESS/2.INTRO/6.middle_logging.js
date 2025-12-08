const express = require('express');
const app = express();
const PORT = 3000;


/**************************/
/* 미들웨어들...          */
/**************************/
// 등록되는.. 순서가 중요하다!!
app.use((req, res, next) => {
    let requestTime = Date.now();
    console.log(`[LOGGING] ${requestTime}`);
    console.log(`[LOGGING] ${Date(requestTime).toString()}`);

    req.this_is_my_time = Date(requestTime).toString();
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

/**************************/
/* 라우터들...            */
/**************************/
app.get('/', (req, res) => {
    console.log('4. 홈 라우트에 접속');
    console.log(`혹시.. 앞에 애가 로깅하면서 시간 보내줬나?? ${req.this_is_my_time}`);
    res.send("웰컴투 마이홈");
});

app.get('/users', (req, res) => {
    console.log('사용자 라우트에 접속');
    res.send("웰컴투 사용자들의 홈");
});

/*******************************************/
/* 아무것도 매칭되지 못한경우...            */
/*******************************************/
// 1) 404 핸들러 (에러가 아님)
app.use((req, res, next) => {
    res.status(404).send('404 Not Found');
});
 
// 2) 그 아래에 에러 처리 미들웨어
app.use((err, req, res, next) => {
    console.error('5. 최종 오류처리 미들웨어:', err);
    res.status(500).send('서버 오류가 발생했습니다.');
});

app.listen(PORT, () => {
    console.log(`Server is ready, http://127.0.0.1:${PORT}`);
});

