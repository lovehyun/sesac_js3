const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('simple.db');

async function do_db_notworking() {
    const result = await db.run("CREATE TABLE IF NOT EXISTS users (id TEXT, name TEXT)");
    const result2 = await db.run("INSERT INTO users VALUES ('id001', 'user1')");

    // await 가 기다려 줄 수 있는건??
    // 내가 일을 시킨애가 일관된(공통된) 방법으로, 나의 진행상황을 알려줄수 있을때...
    // 진행상황을 알려주는애 Promise 라는 형태(객체) 로 상태를 알려주고,
    // 그때 이 상태는?? pending, fulfilled, rejected 를 통해서 상태를 알려줌..

    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
}

async function do_db_working() {
    // 테이블 생성
    await new Promise((resolve, reject) => {
        db.run("CREATE TABLE IF NOT EXISTS users (id TEXT, name TEXT)", (err) => {
            if (err) reject(err);
            else (resolve());
        });
    });
    console.log('테이블이 성공적으로 생성되었습니다.');

    // 데이터 삽입
    await new Promise((resolve, reject) => {
        db.run("INSERT INTO users VALUES ('id001', 'user1')", (err) => {
            if (err) reject(err);
            else (resolve());
        });
    });
    console.log('데이터 삽입이 성공했습니다.');

    // 데이터 조회
    const rows = await new Promise((resolve, reject) => {
        const results = [];
        // db.each는 콜백을 두개 받는애였음. row하나하나, 그리고 다 끝났을때..
        // db.each('SELECT * FROM users', (err, row) => {
        //     if (err) reject(err);
        //     else results.push(row);
        // }, (err, count) => {
        //     if (err) reject(err);
        //     else resolve(results); // 모든 결과를 반납
        // })

        // db.all을 통해서 콜백 하나로 처리
        db.all('SELECT * FROM users', (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        })
    })
    console.log('조회가 성공했습니다.');

    rows.forEach(row => console.log('조회된메시지: ', row));
}

// do_db_notworking();
do_db_working();
