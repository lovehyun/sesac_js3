const http = require('http');

const myapp = {
    routes: {},  // 이번엔 배열이 아니고 key,value를 탐색하기 좋은 자료구조인 object

    // 라우트 등록하는 함수 (경로, 핸들러 - 콜백함수)
    register: function register(route, handler) {
        this.routes[route] = handler;
    },

    // 요청 처리
    handleRequest: function handleRequest(req, res) {
        const route = req.url; // 실제로 http 모듈이 우리에게 전달해줄 내용.
        const handler = this.routes[route]; // 라우터 검색

        if (handler) {
            handler(req, res); // 핸들러가 있으면 그거 호출
        } else {
            res.statusCode = 404;
            res.end('Not Found');
        }
    }
}

function rootHandler(req, res) {
    console.log('사용자가 루트(/) 에 방문');
    res.end('Welcome to my homepage');
}

function userHandler(req, res) {
    console.log('사용자가 /user 에 방문');
    res.write('User 데이터를 프로세싱중입니다...');
    res.end('안녕하세요 사용자님.');
}

function adminHandler(req, res) {
    console.log('사용자가 /admin 관리자 페이지에 접속');
    res.write('Admin 페이지는 인증을 필요로 합니다.');
    res.end('안녕히가세요...');
}

myapp.register('/', rootHandler);
myapp.register('/user', userHandler);
myapp.register('/admin', adminHandler);

const server = http.createServer((req, res) => {
    myapp.handleRequest(req, res);
});

server.listen(3000, () => {
    console.log('서버 레디');
});
