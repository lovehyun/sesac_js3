import { Todo } from "./todo";

// 우리가 정한 자료구조를 배열 형태로 빈 값으로 초기화
const todos: Todo[] = [];

// 리턴이 없을때도 명확하게 없다고 표현해줌 (void)
function addTodo(title: string): void {
    const newTodo: Todo = { id: Date.now(), title, completed: false };
    todos.push(newTodo);
    // console.log('Todo 추가 완료: ', newTodo);
}

addTodo('TS 공부하기');
addTodo('프로젝트 완성하기');

console.log('투두 목록:', todos);
