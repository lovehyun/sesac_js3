// curl -X POST localhost:3000/api/todo -H "Content-Type: application/json" -d "{\"todo\": \"밥먹기\"}"

const express = require('express');
const morgan = require('morgan');

// ===== Swagger 추가 =====
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

const app = express();
const PORT = 3000;

let todos = []; // 여기에 사용자가 입력한 todo가 담길곳...
let idCounter = 1;

app.use(express.static('public'));
app.use(express.json()); // FE 에서 보내온 데이터를 json 으로 보냈다면... 그걸 파싱해서 req.body 에 담아줌
// app.use(express.urlencoded({extended: false})); // FE 에서 보낸 데이터가 urlencoded 로 보냈다면... 그걸 파싱해서 req.body에 담아줌...
app.use(morgan('dev'));

// ===== Swagger 설정 =====
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Todo API',
    version: '1.0.0',
    description: '간단한 in-memory Todo REST API 문서',
  },
  servers: [
    { url: `http://localhost:${PORT}` }, // 로컬 서버
  ],
  components: {
    schemas: {
      Todo: {
        type: 'object',
        properties: {
          id: { type: 'integer', example: 1 },
          todo: { type: 'string', example: '밥먹기' },
          completed: { type: 'boolean', example: false },
        },
        required: ['id', 'todo', 'completed'],
      },
      CreateTodoRequest: {
        type: 'object',
        properties: {
          todo: { type: 'string', example: '밥먹기' },
        },
        required: ['todo'],
      },
      SimpleOk: {
        type: 'object',
        properties: {
          status: { type: 'string', example: 'ok' },
        },
      },
      SuccessResponse: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: true },
        },
      },
    },
  },
};

const swaggerOptions = {
  definition: swaggerDefinition,
  apis: [__filename], // 이 파일(app.js) 안의 주석(@swagger)만 스캔
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

// Swagger UI 라우트
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * @swagger
 * tags:
 *   - name: Todos
 *     description: Todo API
 */

/**
 * @swagger
 * /api/todos:
 *   get:
 *     tags: [Todos]
 *     summary: Todo 전체 목록 조회
 *     responses:
 *       200:
 *         description: Todo 배열 반환
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Todo'
 */
app.get('/api/todos', (req, res) => {
  console.log('todo 달라고 요청함');
  res.json(todos);
});

/**
 * @swagger
 * /api/todo:
 *   post:
 *     tags: [Todos]
 *     summary: Todo 생성
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateTodoRequest'
 *     responses:
 *       200:
 *         description: 생성 성공(간단 상태 응답)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SimpleOk'
 */
app.post('/api/todo', (req, res) => {
  console.log('todo 생성해달라고 요청함');
  console.log(`요청의바디: ${JSON.stringify(req.body)}`);

  const newTodo = { id: idCounter++, todo: req.body.todo, completed: false };

  console.log(newTodo);
  todos.push(newTodo);

  res.json({ status: 'ok' });
});

/**
 * @swagger
 * /api/todo/{id}:
 *   delete:
 *     tags: [Todos]
 *     summary: Todo 삭제
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: 삭제할 Todo의 ID
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: 삭제 성공 여부
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 */
app.delete('/api/todo/:id', (req, res) => {
  const id = req.params.id;
  console.log(`${id} 번 todo 삭제해달라고 요청함`);

  todos = todos.filter((todo) => todo.id != id);

  res.json({ success: true });
});

/**
 * @swagger
 * /api/todo/{id}/completed:
 *   put:
 *     tags: [Todos]
 *     summary: Todo completed 토글
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: 토글할 Todo의 ID
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: 토글 성공 여부 (존재하지 않으면 success=false)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 */
app.put('/api/todo/:id/completed', (req, res) => {
  const id = req.params.id;
  console.log(`${id} 의 완성을 체크함`);

  const todo = todos.find((todo) => todo.id == id);
  console.log('검색된 내용 확인: ', todo);

  if (todo) {
    todo.completed = !todo.completed;
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});

// 라우트 끝 <---

app.listen(PORT, () => {
  console.log('Server is ready at http://localhost:3000');
  console.log(`Swagger UI: http://localhost:${PORT}/api-docs`);
});

// curl -X GET 127.0.0.1:3000/api/todos
// curl -X POST 127.0.0.1:3000/api/todo -H "Content-Type: application/json" -d "{ \"todo\": \"hello\" }"
// curl -X PUT 127.0.0.1:3000/api/todo/1/completed
// curl -X PUT 127.0.0.1:3000/api/todo/2/completed
