const http = require('http');

// const url = 'http://www.example.com/path/test.html'
const url = 'http://www.example.com/'

const req = http.request(url, (res) => {
    console.log('STATUS:', res.statusCode);

    console.log('HEADERS: ', res.headers);
    console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
    
    res.setEncoding('utf8');
    res.on('data', (chunk) => {
        console.log(`BODY: ${chunk}`);
    });
});

req.on('error', (error) => {
    console.log('오류발생');
});

req.end(); // 말은 end인데, 이놈이 시작을 해줌...
