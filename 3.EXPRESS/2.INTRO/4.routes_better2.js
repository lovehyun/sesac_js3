const express = require('express');
const app = express();
const PORT = 3000;    // 보통 상수는 대문자로 함

app.get('/', (req, res) => {
    res.send("나의 루트");
});

// 상품 조회는 일반적으로 GET파라미터, 쿼리 파라미터를 통해서 요청이 들어옴
// 예제) myshop/search?keyword=apple
// 우리실습) 127.0.0.1:3000/product?category=it&name=apple
app.get('/products', (req, res) => {
    // GET 파라미터는 쿼리파라미터라고 부르고, req.query 에 담겨서 옴
    console.log(`상품분류: ${req.query.category}, 상품이름: ${req.query.name}`);
    res.send("나의 상품");
});

// 고객님의 회원번호, 즉 ID를 어떻게 보내올까?
app.get('/users/:id', (req, res) => {
    // 익스프레스 개발자가, 이렇게 가변인자로 정의한것은
    // req.params 라는 자료구조에 담아서 보내줌..
    console.log(req.params.id);
    res.send(`나의 고갱님 ID는: ${req.params.id} 입니다`);
});

app.post('/users', (req, res) => {
    let newId = 12345;
    res.send(`나의 신규 고갱님 생성: 신규 ID는 ${newId} 입니다.`);
});

app.put('/users/:id', (req, res) => {
    res.send("나의 고갱님 정보 수정");
});

app.delete('/users/:id', (req, res) => {
    res.send("나의 고갱님 삭제");
});

app.listen(PORT, () => {
    console.log(`Server is ready at http://127.0.0.1:${PORT}/`);
});
