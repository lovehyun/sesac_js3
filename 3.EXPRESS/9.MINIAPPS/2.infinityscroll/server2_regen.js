const express = require('express');
const figlet = require('figlet');

// 가상 데이터 생성
const data = Array.from({ length: 100 }, (_, i) => `Item ${i + 1}`);
// console.log(data);

const app = express();
const PORT = 3000;

// 미들웨어 추가
app.use(express.static('public'));

// 0. 미들웨어로 [시간] [METHOD] [URL-Path] 를 찍어보기
function myLogger(req, res, next) { // 입력 인자를 채워넣고...
    // 나중에는... morgan 이라는 로그 라이브러를 쓸건데.. 지금 그냥 재미삼아.. 직접 구현해봤음..
    const now = new Date().toISOString();
    const method = req.method;
    const urlpath = req.originalUrl;
    console.log(`[${now}] [${method}] [${urlpath}]`);
    next();
}

app.use(myLogger);

// 0부터 20사이의 랜던 숫자 생성
function getRandomIncrease() {
    return Math.floor(Math.random() * 21); // 0 ~ 20
}

// 매 10초마다 위의 생성된 갯수로 랜덤하게 증가
setInterval(() => {
    const randNum = getRandomIncrease();
    const currentLength = data.length;
    for (let i = 0; i < randNum; i++) {
        data.push(`Item ${currentLength + i + 1}`);
    }
    console.log(`Added ${randNum}`);
}, 10_000); // 10000ms = 10s

function getItemsFromTo(start, end) {
    return data.slice(start, end);
}

// /api/items?start=10&end=20
app.get('/api/items', (req, res) => {
    // 1. 변수를 선언하고 사용자의 입력을 받아온다. 
    // 모든 입력은 다 문자열이다. 내부 연산을 위해 필요한 타입들로 변환을 해주는것이 좋음..

    // const start = req.query.start;
    // const end = req.query.end;

    const { start, end } = req.query;

    // 2. 이 번호에 해당하는걸 우리 배열에서 골라낸다.
    const items = getItemsFromTo(parseInt(start), parseInt(end));

    // 3. 그 내용을 전달한다.
    // console.log(items);
    res.json(items);
})

app.listen(PORT, () => {
    // 베너를 찍는 한줄짜리 코드
    figlet("SESAC", (err, data) => { if (!err) console.log(data); });
    console.log(`Server is up on http://127.0.0.1:${PORT}`);
});
