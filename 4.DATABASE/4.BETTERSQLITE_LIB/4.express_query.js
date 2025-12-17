const express = require('express');
const Database = require('better-sqlite3');
const fs = require('fs');

const port = 3000;
const db_file = 'my-express-db.db'

const app = express();
const db = new Database(db_file);

// 입력 요청 json으로 받아서 req.body에 받아주기 위한 미들웨어...
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

function init_database() {
    const sql = fs.readFileSync('init_database.sql', 'utf8'); // sync라서 동기 모드로 읽힘 (즉 블럭킹 함수)
    const statements = sql.split(';');
    try {
        for (const statement of statements) {
            // console.log(statement);
            db.exec(statement);
        }
    } catch(err) {
        console.log('이미 초기화 되었습니다.'); // 아주 좋은 코드는 아님..
    }
}

init_database();


app.get('/api/table/:table', (req, res) => {
    const db_table = req.params.table;

    try {
        const query_str = `SELECT * FROM ${db_table}`;
        console.log(query_str);

        const query = db.prepare(query_str);
        const queryResult = query.all();
        res.json(queryResult)
    } catch (err) {
        res.send('요청하신 테이블 정보는 존재하지 않습니다.');
    }
})

// curl localhost:3000/api/users?username=sesac
// curl localhost:3000/api/users?username=hello
// curl localhost:3000/api/users?username=r1
// curl localhost:3000/api/users
app.get('/api/users', (req, res) => {
    // try-catch 해줘야함.
    const { username } = req.query;

    if (username) {
        const query = db.prepare('SELECT * FROM users WHERE username LIKE ?');
        const users = query.all(`%${username}%`);
        res.json(users);
    } else {
        const users = db.prepare('SELECT * FROM users').all();
        res.send(users);
    }
});

// curl localhost:3000/api/users/1
app.get('/api/users/:id', (req, res) => {
    const userId = req.params.id;

    const user = db.prepare('SELECT * FROM users WHERE id=?').get(userId);
    if (user) {
        res.json(user);
    } else {
        // return res.send("사용자가 없습니다."); // 200 이 전달됨.
        return res.status(404).send("사용자가 없습니다.");
    }
});

// 아래 형식은 urlencoded 미들웨어가 파싱함
// curl -X POST localhost:3000/api/users -d username=hello -d password=world
app.post('/api/users', (req, res) => {
    // try-catch 를 해야함...
    const { username, password } = req.body;
    const insert = db.prepare('INSERT INTO users (username, password) VALUES (?,?)');
    const result = insert.run(username, password);
    res.send(`사용자가 추가되었습니다. 신규ID: ${result.lastInsertRowid}`);
});

// curl -X GET localhost:3000/api/users/2
// curl -X PUT localhost:3000/api/users/2 -d username=change2 -d password=new-password
// 숙제
app.put('/api/users/:id', (req, res) => {
    // 이거 완성하기 UPDATE SET
    const userId = req.params.id;
    const { username, password } = req.body;
    const update = db.prepare('UPDATE users SET username=?, password=? WHERE id=?');
    update.run(username, password, userId);
    res.send('사용자 정보가 업데이트 되었습니다.');
});

// curl -X GET localhost:3000/api/users/3
// curl -X DELETE localhost:3000/api/users/3
app.delete('/api/users/:id', (req, res) => {
    // 이건 지금하기 DELETE FROM
    const userId = req.params.id;
    const deleteQuery = db.prepare('DELETE FROM users WHERE id=?');
    deleteQuery.run(userId);
    res.send('사용자를 성공적으로 삭제하였습니다.');
});

// curl localhost:3000/api/products?name=apple
// curl localhost:3000/api/products?name=1
// curl localhost:3000/api/products?name=product+1
// curl localhost:3000/api/products?name=product%201   %20은 ascii hex값으로 space에 해당함 
app.get('/api/products', (req, res) => {
    const { name } = req.query;

    if (name) {
        const query = db.prepare('SELECT * FROM products WHERE name LIKE ?');
        const rows = query.all(`%${name}%`);
        res.json(rows);
    } else {
        const query = db.prepare('SELECT * FROM products');
        const rows = query.all();
        res.json(rows);
    }
})

app.listen(port, () => {
    console.log('Server is ready...');
});
