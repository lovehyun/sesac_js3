// npm i request
const request = require('request');
const dotenv = require('dotenv');

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

request.get({
    url: url,
    headers: headers
}, (error, response, body) => {
    if (error) {
        console.error(error);
    } else {
        const data = JSON.parse(body);
        console.log(data);
        console.log(response.statusCode, response.statusMessage);
    }
});
