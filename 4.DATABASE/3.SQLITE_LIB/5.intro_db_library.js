const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('simple.db');

function connectDB(dbname) {}

function runQuery(query, params = []) {
    return new Promise((resolve, reject) => {
        db.run(query, params, (err) => {
            if (err) {
                return reject(err);
            }
            console.log("나는 누구인가: ", this);  // Statement

            resolve(this);  // db.run 이 내부적으로 실행한 결과를 담아서 Promise 바깥으로 보내줌..
                            // 그 데이터 타입이 STatement라는 클래스였다..
                            // 그리고 그 클래스는 lastID, changes 이런걸 담고 있음..
                            // 그래서, 그것이 runQuery를 호출한 애의 return값으로 전달됨..
        })
    })
}

function allQuery(query, params = []) {
    return new Promise((resolve, reject) => {
        db.all(query, params, (err, rows) => {
            if (err) {
                return reject(err);
            }
            resolve(rows);
        })
    })
}

function getQuery() {}

function eachQuery() {}

module.exports = {
    runQuery,
    allQuery
}
