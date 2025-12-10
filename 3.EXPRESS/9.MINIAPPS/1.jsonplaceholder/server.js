const express = require('express');
const app = express();
const port = 3000;

// 내부 변수 정의
let posts = [
    { id: 1, title: '나의 첫번째 글', body: '이것은 나의 첫번째 글입니다.'},
    { id: 2, title: '나의 두번째 글', body: '이것은 나의 두번째 글입니다.'},
    { id: 3, title: '나의 세번째 글', body: '이것은 나의 세번째 글입니다.'},
]

// 미들웨어 정의
app.use(express.static('public'));

// 라우트 정의
app.get('/api/posts', (req, res) => {
    res.json(posts); // 알아서 나의 헤더에 application/json 을 담아서 보내준다.
});

app.get('/api/posts/:id', (req, res) => {
    const postId = Number(req.params.id);
    // console.log(postId);  // <-- 여기에 집중...
    // const realPostId = postId - 1;

    const post = posts.find(p => p.id == postId);
    console.log(post);

    if (!post) {
        return res.send({"status":"원하는 항목은 없습니다."});
    }

    res.json(post);
});

app.delete('/api/posts/:id', (req, res) => {
    const postId = Number(req.params.id);

    // 아래 filter는 사실 지우는 함수는 아니고, 원하는걸 골라내는 함수임..
    const newPosts = posts.filter(post => post.id !== postId);
    posts = newPosts;
    res.send({"status":`${postId} 를 삭제하였습니다.`});
});

// 서버 시작
app.listen(port, () => {
    console.log('서버레디');
});
