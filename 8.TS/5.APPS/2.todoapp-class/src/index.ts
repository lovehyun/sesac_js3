import { TodoManager } from "./todomanager";

const mytodo = new TodoManager();

const todo1 = mytodo.addTodo("TS 학습하기");
const todo2 = mytodo.addTodo("프로젝트 완성하기");

console.log("=== 할일 추가후 ===");
console.log("할일: ", mytodo.listTodo());

mytodo.toggleTodo(todo1.id);
console.log("=== 토글 진행후 ===");
console.log("할일: ", mytodo.listTodo());

mytodo.removeTodo(todo1.id);
console.log("=== 삭제1 진행후 ===");
console.log("할일: ", mytodo.listTodo());

mytodo.removeTodo(todo2.id);
console.log("=== 삭제2 진행후 ===");
console.log("할일: ", mytodo.listTodo());
