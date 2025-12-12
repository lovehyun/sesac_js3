const http = require('http');

const myapp = {
    middlewares: [], // 글로벌 미들웨어들은 여기에 등록
    routes: {}, // 개별 라우트 및 핸들러는 여기에 등록

    // 전역 미들웨어를 등록하는 함수
    use(fn) {
        this.middlewares.push(fn);
    },

    // 라우트 등록하는 함수
    register(route, handler) {
        this.routes[route] = handler;
    },

    // 요청을 처리하는 함수
    handleRequest(req, res) {
        // 요청을 받아서, 어디 요청했는지 확인.
        const route = req.url;
        const handler = this.routes[route];

        // 라우터가 없으면??
        if (!handler) {
            res.statusCode = 404;
            return res.end(`Not Found: ${route}`);
        }

        // 미들웨어가 있으면, 미들웨어부터 처리한다.
        const context = { req, res, route };
        const stack = [...this.middlewares, handler]; // 스프레드연산자로 
        let index = 0;

        // 라우터 처리한다. (요청한 라우트가 없으면 404 반환한다.)
        const next = () => {
            if (res.writableEnded) return; // 누군가 미들웨어에서 응답을 해버리면 거기서 종료

            const fn = stack[index++];
            if (fn) {
                fn(context, next);
            }
        };

        next(); // 첫번째 미들웨어(핸들러) 부터 실행을 시작함.
    }
}

// 미들웨어 등록
function loggerMiddleware(context, next) {
    console.log(`[LOG] ${context.req.method}, ${context.route}`)
    next();
}

function timeMiddleware(context, next) {
    context.startTime = Date.now();
    next();
}

function headerMiddleware(context, next) {
    context.res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    next();
}

myapp.use(loggerMiddleware);
myapp.use(timeMiddleware);
myapp.use(headerMiddleware);

// 라우터 등록
function rootHandler(context) {
    context.res.end('Hello from /');
}

function userHandler(context) {
    context.res.end('Hello from /user');
}

function adminHandler(context) {
    context.res.end('Hello from /admin');
}

myapp.register('/', rootHandler);
myapp.register('/user', userHandler);
myapp.register('/admin', adminHandler);


// 서버 생성
const server = http.createServer((req, res) => {
    myapp.handleRequest(req, res);
});

server.listen(3000, () => {
    console.log('서버 레디');
});
