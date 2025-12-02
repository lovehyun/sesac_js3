const url = require('url');

const myURL = 'https://www.example.com/api/path?query=value';

const urlObj = new URL(myURL);

console.log("호스트: ", urlObj.host)
console.log("경로: ", urlObj.pathname);
console.log("쿼리: ", urlObj.search)