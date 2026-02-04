const express = require('express');
const path = require('path');

const app = express();

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', '2.news.html'));
});

const newsArticles = [
    "정부, 올해 AI 산업 육성 위해 5천억 예산 추가 편성 발표",
    "국내 스타트업, 자율주행 로봇 배송 서비스 상용화 성공",
    "서울시, 도심 항공 교통(UAM) 실증 구간 내년부터 운영",
    "국산 반도체 기업, 차세대 3나노 공정 양산 체제 돌입",
    "기상청, 이번 주말 전국에 강풍 동반한 비 예보",
    "대형 포털, 검색 서비스에 생성형 AI 요약 기능 정식 도입",
    "과기정통부, 사이버보안 인력 2천 명 양성 계획 발표",
    "은행권, 고객 대상 실시간 계좌 이상 탐지 AI 시스템 구축",
    "교육부, 온라인 대학 강의 품질 인증제 시범 운영 개시",
    "국내 연구팀, 암세포 탐지 정확도 높인 AI 의료 모델 개발"
];

app.get('/newsfeed', (req, res) => {
    // SSE 헤더 설정
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    // 뉴스 전송
    let index = 0;
    const sendNews = () => {
        if (index >= newsArticles.length) {
            index = 0;
        }

        const news = newsArticles[index];
        res.write(`data: ${JSON.stringify({ news })}\n\n`);
        index++;
    }

    // 2~5초의 랜덤 딜레이로 전달하기 - 1회성 랜덤
    const interval = setInterval(() => {
        sendNews();
    }, Math.floor(Math.random() * 3000) + 2000);

    req.on('close', () => {
        clearInterval(interval);
    });
});

app.listen(3000, () => {
    console.log('서버 레디...');
});
