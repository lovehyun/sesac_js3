// curl -X POST localhost:3000/api/todo -H "Content-Type: application/json" -d "{\"todo\": \"밥먹기\"}"

const express = require('express');
const morgan = require('morgan');

const app = express();
const PORT = 3000;

let todos = []; // 여기에 사용자가 입력한 todo가 담길곳...
let idCounter = 1;

app.use(express.static('public'));
app.use(express.json()); // FE 에서 보내온 데이터를 json 으로 보냈다면... 그걸 파싱해서 req.body 에 담아줌
// app.use(express.urlencoded({extended: false})); // FE 에서 보낸 데이터가 urlencoded 로 보냈다면... 그걸 파싱해서 req.body에 담아줌...
app.use(morgan('dev'));


// 라우트 설계 --->
app.get('/api/todo', (req, res) => {
    console.log('todo 달라고 요청함');
    res.json(todos);
});

app.post('/api/todo', (req, res) => {
    console.log('todo 생성해달라고 요청함');
    console.log(`요청의바디: ${JSON.stringify(req.body)}`);
    const newTodo = {id: idCounter++, todo: req.body.todo, completed: false};

    // idCounter = idCounter + 1;  // 별도 줄로 하거나, 위에서 함축된 표현식으로 ++ 로 쓰거나...
    
    console.log(newTodo);
    todos.push(newTodo);

    res.json({"status":"ok"}); // 응답의 룰은 내가 정하면 됨.. 아무것도 안줄건지, id만 줄건지, 전체 추가된 항목 내용을 다 줄건지, 또는 상태 코드만 줄건지... 정말 회사마다/제품마다 캐바캐임;;;
});

app.delete('/api/todo', (req, res) => {  // 입력 인자를 ? 쿼리파라미터로 받을지 URL파라미터를 받을지 (잘 모르면 지금 케이스에서는 후자로 :id 로 처리)
    console.log('todo 삭제해달라고 요청함');
    // id를 받아서, 그 id를 가진 항목을 삭제한다.
    // todos.filter를 통해서 비교해본다.

    res.json({ success: true });  // 다양한 양식일뿐, 결론적으로는 한 타입으로 통일..
});

app.put('/api/todo', (req, res) => { // 입력 인자... 위처럼 URL 파라미터로 받으면 :id
    console.log('todo 수정해달라고 요청함');
    // id를 찾아서, completed 를 toggle (complated 에 true/false를 변경)
});

// 라우트 끝 <---

app.listen(PORT, () => {
    console.log('Server is ready at http://localhost:3000');
});
