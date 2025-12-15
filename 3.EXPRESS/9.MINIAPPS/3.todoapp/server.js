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
app.get('/api/todos', (req, res) => {
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

app.delete('/api/todo/:id', (req, res) => {  // 입력 인자를 ? 쿼리파라미터로 받을지 URL파라미터를 받을지 (잘 모르면 지금 케이스에서는 후자로 :id 로 처리)
    const id = req.params.id;
    console.log(`${id} 번 todo 삭제해달라고 요청함`);
    // id를 받아서, 그 id를 가진 항목을 삭제한다.
    // todos.filter를 통해서 비교해본다.

    todos = todos.filter(todo => todo.id != id);  // 입력한 값이 아닌것을 다시 todo에 담기

    res.json({ success: true });  // 다양한 양식일뿐, 결론적으로는 한 타입으로 통일..
});

app.put('/api/todo/:id/completed', (req, res) => { // 입력 인자... 위처럼 URL 파라미터로 받으면 :id
    const id = req.params.id; // 받아오는 모든건 문자열이라, parseInt, Number 등으로 형(type)변환을 해주는것이 더 좋음 
    console.log(`${id} 의 완성을 체크함`);
    
    // id를 찾아서, completed 를 toggle (complated 에 true/false를 변경)
    const todo = todos.find(todo => todo.id == id); // === 자료타입과 값을 함께 비교
                                                    // == 자료타입을 안보고 값만 비교
    console.log('검색된 내용 확인: ', todo);
    if (todo) {
        // if (todo.completed == true) {
        //     todo.completed = false;
        // } else if (todo.completed == false) {
        //     todo.complated = true;
        // }

        todo.completed = !todo.completed;

        res.json({ success: true });
    } else {
        res.json({ success: false });
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