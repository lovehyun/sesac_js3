const myapp = {
    middlewares: [],

    // 미들웨어를 등록하는 메서드(함수)
    register(fn) {
        this.middlewares.push(fn);
    },

    // 미들웨어를 실행하기 위한 메서드
    run(context) {
        for (let fn of this.middlewares) { // 나에게 등록된 미들웨어를 순차적으로 실행
            fn(context);
        }
    }
};

function middleware1(context) {
    console.log('미들웨어1 실행');
    context.step1 = "미들웨어1 이 처리한 변수";
}

function middleware2(context) {
    console.log('미들웨어2 실행');
    context.step2 = "미들웨어2 이 처리한 변수";
}

function middleware3(context) {
    console.log('미들웨어3 실행');
    context.step3 = "미들웨어3 이 처리한 변수";
}

myapp.register(middleware3);
myapp.register(middleware2);
myapp.register(middleware1);

const context = {}; // 나의 서비스가 처리되면서 저장할 빈 공간.

myapp.run(context);

console.log("최종 Context 상태: ", context);
