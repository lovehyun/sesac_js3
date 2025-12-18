// curl -X POST localhost:3000/api/todo -H "Content-Type: application/json" -d "{\"todo\": \"밥먹기\"}"

const express = require('express');
const morgan = require('morgan');
const Database = require('better-sqlite3');

const app = express();
const PORT = 3000;

// DB-TODO: 아래 이 두 변수를 없애고, DB로 대체... DB에 접속해서 요청하고..
const db = new Database('todos.db');
console.log('DB 연결 성공');

function init_db() {
    db.exec(`
CREATE TABLE IF NOT EXISTS todos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    todo TEXT NOT NULL,
    completed INTEGER DEFAULT 0
)`)
    console.log('DB 초기화 완료');
}
init_db();

app.use(express.static('public'));
app.use(express.json()); // FE 에서 보내온 데이터를 json 으로 보냈다면... 그걸 파싱해서 req.body 에 담아줌
app.use(express.urlencoded({extended: false})); // FE 에서 보낸 데이터가 urlencoded 로 보냈다면... 그걸 파싱해서 req.body에 담아줌...
app.use(morgan('dev'));


// 라우트 설계 --->
app.get('/api/todos', (req, res) => {
    console.log('todo 달라고 요청함');
    // DB-TODO : SELECT * FROM todos; 라고 해서 받아온 결과를 반납한다.
    const selectStm = db.prepare('SELECT * FROM todos');
    const todos = selectStm.all();
    console.log(todos);

    res.json(todos);
});

app.post('/api/todo', (req, res) => {
    console.log('todo 생성해달라고 요청함');
    console.log(`요청의바디: ${JSON.stringify(req.body)}`);

    // const newTodo = {id: idCounter++, todo: req.body.todo, completed: false};
    // idCounter = idCounter + 1;  // 별도 줄로 하거나, 위에서 함축된 표현식으로 ++ 로 쓰거나...
    // DB-TODO : INSERT INTO todos VALUES (req.body.todo 또는 newTodo.todo) 등으로 삽입...
    const insertStm = db.prepare('INSERT INTO todos (todo, completed) VALUES (?, 0)'); // 위에 DEFAULT 0 을 했으면 여기서 굳이 안해도 됨.. 안했으면 여기에서 삽입할때 초기화(0으로 셋팅)
    const todo = req.body.todo;
    const result = insertStm.run(todo);
    console.log(result);
    
    res.json({"status":"ok"}); // 응답의 룰은 내가 정하면 됨.. 아무것도 안줄건지, id만 줄건지, 전체 추가된 항목 내용을 다 줄건지, 또는 상태 코드만 줄건지... 정말 회사마다/제품마다 캐바캐임;;;
});

app.delete('/api/todo/:id', (req, res) => {  // 입력 인자를 ? 쿼리파라미터로 받을지 URL파라미터를 받을지 (잘 모르면 지금 케이스에서는 후자로 :id 로 처리)
    const id = req.params.id;
    console.log(`${id} 번 todo 삭제해달라고 요청함`);
    // id를 받아서, 그 id를 가진 항목을 삭제한다.
    // todos.filter를 통해서 비교해본다.

    // DB-TODO : DELETE FROM todos WHERE id=?? 형태로 변경..
    const deleteStm = db.prepare('DELETE FROM todos WHERE id=?');
    const result = deleteStm.run(id);
    console.log('삭제된 ID: ', result.lastInsertRowid);

    res.json({ success: true });  // 다양한 양식일뿐, 결론적으로는 한 타입으로 통일..
});

app.put('/api/todo/:id/completed', (req, res) => { // 입력 인자... 위처럼 URL 파라미터로 받으면 :id
    const id = req.params.id; // 받아오는 모든건 문자열이라, parseInt, Number 등으로 형(type)변환을 해주는것이 더 좋음 
    console.log(`${id} 의 완성을 체크함`);
    
    // DB-TODO : SELECT * FROM todos WHERE id=?? 를 해서, 일단 존재여부확인해서 적절하게 리턴...
    // DB-TODO : UPDATE SET completed=!completed WHERE id=??
    const selectStm = db.prepare('SELECT * FROM todos WHERE id=?');
    const result = selectStm.get(id);
    console.log(result);
    if (result) {
        const newCompleted = result.completed ? 0 : 1; // 토글을 3항 연산자로 구현
        const updateStm = db.prepare('UPDATE todos SET completed=? WHERE id=?');
        updateStm.run(newCompleted, id);
        res.json({success: true});
    } else {
        // 사용자가 '완료' 처리하려는 항목이 없으면??
        res.status(404).json({ success: false, message: '해당 항목이 없습니다'})
    }
});

// 라우트 끝 <---

app.listen(PORT, () => {
    console.log('Server is ready at http://localhost:3000');
});

// curl -X GET 127.0.0.1:3000/api/todos
// curl -X POST 127.0.0.1:3000/api/todo -H "Content-Type: application/json" -d "{ \"todo\": \"hello\" }"
// curl -X PUT 127.0.0.1:3000/api/todo/1/completed
// curl -X PUT 127.0.0.1:3000/api/todo/2/completed