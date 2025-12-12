const http = require('http');

const myapp = {
    middlewares: [], // 글로벌 미들웨어들은 여기에 등록
    routes: {}, // 개별 라우트 및 핸들러는 여기에 등록

    // 전역 미들웨어를 등록하는 함수
    use(fn) {
        this.middlewares.push(fn);
    },

    // 라우트 등록하는 함수 - 다중 핸들러 등록
    // 예) myapp.register('/user', logger, usermid1, userHandler);
    register(route, ...handlers) {
        this.routes[route] = handlers;
    },

    // 요청을 처리하는 함수
    handleRequest(req, res) {
        // 요청을 받아서, 어디 요청했는지 확인.
        const route = req.url;
        const routeHandlers = this.routes[route];

        // 라우터가 없으면?? (이제 [] 을 받을수 있어서, 배열의 길이가 0인것도 오류처리...)
        if (!routeHandlers || routeHandlers.length === 0) {
            res.statusCode = 404;
            return res.end(`Not Found: ${route}`);
        }

        // 미들웨어가 있으면, 미들웨어부터 처리한다.
        const context = { req, res, route };
        const stack = [...this.middlewares, ...routeHandlers]; // 스프레드연산자로 
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
    // console.log(`[LOG] ${context.req.method}, ${context.route}`)
    next();
    // 아래는 morgan 이 만들어진 원리.
    if (context.startTime) {
        const duration = Date.now() - context.startTime;
        console.log(`[LOG2] ${context.req.method}, ${context.route} - ${context.res.statusCode} ${duration}ms`)
    }
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

function userMiddleware(context, next) {
    context.res.write('추가적인 /user 미들웨어 처리중...');
    next();
}

function adminAuthMiddleware(context, next) {
    const authorized = false; // 인증 실패 또는 안했음을 가정
    if (!authorized) {
        context.res.statusCode = 403; // Forbidden
        context.res.end('Admin 은 인증을 필요로 합니다.');
        return; // next() 를 호출 안해서 종료되게 하려는 의도
    }

    next(); // authorized가 true면 여기로 와서 통과~
}

// 인증 성공 (토큰이 우리가 기대하는것)
// curl http://localhost:3000/admin -H "Authorization: Bearer admin1234"

// 인증 실패 (토큰이 틀렸음)
// curl http://localhost:3000/admin -H "Authorization: Bearer admin1233"

function adminRealAuthMiddleware(context, next) {
    // const req = context.req;
    // const res = context.res;
    const { req, res } = context;

    const authHeader = req.headers['authorization']; // 실제 인증 헤더 읽어오기...
    if (!authHeader) {
        res.statusCode = 401; // Unauthorized (인증실패)
        res.end('Authorization is required');
        return;
    }

    // 원하는 인증 형식: "Bearer 토큰값"
    const [scheme, token] = authHeader.split(' ');
    
    if (scheme !== 'Bearer' || token !== 'admin1234') {
        res.statusCode = 403; // Forbidden (인가실패)
        res.end('Invalid token or expired token');
        return;
    }

    console.log('Admin 인증 성공');

    next(); // 인증이 성공하면 여기로 와서 통과~
}

myapp.register('/', rootHandler);
myapp.register('/user', userMiddleware, userHandler);
// myapp.register('/admin', adminAuthMiddleware, adminHandler);
myapp.register('/admin', adminRealAuthMiddleware, adminHandler);

// 디버그를 위한 나의 자료구조 살펴보기...
function printRouteStacks(app) {
    console.log('=== 내 라우트 실행 순서 살펴보기 ===');

    for (const [route, handlers] of Object.entries(app.routes)) {
        const stack = [...app.middlewares, ...handlers];

        const names = ['req', ...stack.map(fn => fn.name), 'res'];

        console.log(`${route}: ${names.join(' -> ')}`);
    }

    console.log('==============================');
}

printRouteStacks(myapp);

// 서버 생성
const server = http.createServer((req, res) => {
    myapp.handleRequest(req, res);
});

server.listen(3000, () => {
    console.log('서버 레디');
});
