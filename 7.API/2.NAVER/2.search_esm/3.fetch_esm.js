import dotenv from 'dotenv';

dotenv.config({ quiet: true });

const text = '자바스크립트';
const encText = encodeURIComponent(text);

const url = `https://openapi.naver.com/v1/search/blog?query=${encText}`  // 기본값 json
// const url = 'https://openapi.naver.com/v1/search/blog.json'
// const url = 'https://openapi.naver.com/v1/search/blog.xml'  // xml

// console.log(url);

const headers = {
    'X-Naver-Client-Id': process.env.NAVER_CLIENT_ID,
    'X-Naver-Client-Secret': process.env.NAVER_CLIENT_SECRET
};

async function run() {
    try {
        const res = await fetch(url, {
            method: 'GET',
            headers: headers,
        });

        if (!res.ok) {
            throw new Error(`요청에 실패했습니다.${res.status} ${res.statusText}`);
        }

        const data = await res.json();
        console.log(data);
    } catch (err) {
        console.error('Error:', err.message);
    }
}

run();
