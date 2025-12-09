const express = require('express');
// const bodyParser = require('body-parser');  // 옛날에는 express 에 이게 없어서 수동으로 설치해 해야 했음..
const app = express();
const PORT = 3000;

app.use(express.static('public'));

// app.use(bodyParser.urlencoded());

// form 데이터로 부터 온걸 x-www-form-urlencoded 라고 부름..
// 이 미들웨어는? 사용자로부터 전달받은 위 MIME 타입을 찾아서 req.body 에 담아준다.
app.use(express.urlencoded({ extended: false })); // 확장 문법 안씀. 기본만 씀.


app.post('/login', (req, res) => {
    console.log(req.body); // 원래는 이런거 없음. undefined 임.. 근데 미들웨어를 거치면서 이게 생겨난거임.
    const id = req.body.id;
    const pw = req.body.pw;

    res.send(`당신의 ID는 ${id} 그리고 PW는 ${pw} 입니다.`)
});

app.listen(PORT, () => {
    console.log('서버 레디');
});

