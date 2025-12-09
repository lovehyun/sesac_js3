// npm i nunjucks
// npm i chokidar   // 파일의 변화를 모니터링 하기 위한 추가 라이브러리
                    // 아래에서 watch: true 에서 필요함.
const express = require('express');
const nunjucks = require('nunjucks');

const app = express();

const PORT = 3000;

app.set('view engine', 'njk');

nunjucks.configure('views', {
    autoescape: true, // XSS 자동 대응하기 위한 설정
    express: app,
    watch: true // 개발용으로, 템플릿 파일의 변경을 알아서 감지해줌.
});

app.get('/', (req, res) => {
    res.render('index', { title: '익스프레스 앱', message: 'NJK를 사용해서 서버사이드 랜더링을 합니다.' });
});

app.get('/fruits', (req, res) => {
    const fruits = ['사과', '바나나', '오렌지', '포도'];
    res.render('fruits', { fruits: fruits })
});

app.listen(PORT, () => {
    console.log('서버 레디');
});
