const express = require('express');
const app = express();
const PORT = 3000;

// static 폴더를 설정해서.. 이 html파일을 서빙하시오.
app.use(express.static('public'));

app.get('/submit', (req, res) => {
    // 우리가 배울걸 사용해서, 콘솔로그로.. 사용자가 보낸값을 출력해보시오.

    // let으로 받아도 상관은 없지만, 사용자가 보낸 데이터를 굳이 내가 바꿔야 할 이유가 있을까?? 그래서 보통 const 로 함...
    const name = req.query.name;
    const age = req.query.age;

    console.log(`사용자 이름: ${name}, 나이는: ${age} 입니다.`);
    res.send(`<H1>잘 받았습니다: ${name}님, ${age}</H1>`);
});

app.listen(PORT, () => {
    console.log(`Server is ready at http://127.0.0.1:${PORT}`);
});
