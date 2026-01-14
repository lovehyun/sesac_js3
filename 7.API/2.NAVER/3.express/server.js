
// const express = require('express');
// const dotenv = require('dotenv');
// const morgan = require('morgan');

import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';

dotenv.config({ quiet: true });

const client_id = process.env.NAVER_CLIENT_ID;
const client_secret = process.env.NAVER_CLIENT_SECRET;

if (!client_id || !client_secret) {
    console.error('NAVER_CLIENT_ID 또는 NAVER_CLIENT_SECRET 이 설정되지 않았습니다. .env를 확인하세요.');
    process.exit(1);
}

const PORT = 3000;
const app = express();

app.use(express.static('public'));
app.use(morgan('dev'));
// app.use(cors()); // cors({ origin: '*' });
// app.use(cors({
//     origin: ['http://127.0.0.1:5173', 'http://localhost:5173']
// }));

// --> 이전 코드 복붙 및 간소화
const BASE_URL = `https://openapi.naver.com/v1/search/blog`

const headers = {
    'X-Naver-Client-Id': client_id,
    'X-Naver-Client-Secret': client_secret
};

async function fetchBlogPage(text, page=1, display=10) {
    const encText = encodeURIComponent(text);
    const start = (page - 1) * display + 1;
    const url = `${BASE_URL}?query=${encText}&start=${start}&display=${display}`

    const res = await fetch(url, {
        method: 'GET',
        headers: headers,
    });

    if (!res.ok) {
        // 위에 키가 없으면?? 401 Unauthorized 발생
        throw new Error(`요청 실패: ${res.status} ${res.statusText}`);
    }

    return res.json();
}
// <-- 이전 코드 복붙

app.get('/api/search', async (req, res) => {
    const text = req.query.query;

    const page = parseInt(req.query.page || '1');
    const display = parseInt(req.query.display || '10');

    console.log(text);
    // 입력 인자를 처리해서 page, display 받아오기...

    try {
        const result = await fetchBlogPage(text, page, display);
        console.log(result);
        return res.status(200).json(result);
    } catch (err) {
        console.log(err);
        return res.status(500).json({error: 'error'});
    }

});

const server = app.listen(PORT, () => {
    console.log('서버 레디');
});

server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.error(`포트 ${PORT} 이미 사용 중`);
    } else {
        console.error('서버 에러:', err);
    }
    process.exit(1);
});
