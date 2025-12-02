// 신버전이 문제가 되는거니..
// 구버전을 설치한다..
// npm install uuid@8

const { v4: uuidv4 } = require('uuid');

const myid = uuidv4()
console.log('생성된 UUID: ', myid);
