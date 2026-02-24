import { Todo } from "./todo";

export class TodoManager {
    private todos: Todo[] = [];

    toggleTodo(id: number): boolean {
        const todo = this.todos.find(t => t.id === id);
        if (!todo) return false;
        todo.toggle();
        return true;
    }

    addTodo(title: string): Todo {
        const newTodo = new Todo(title);
        this.todos.push(newTodo);
        return newTodo;
    }

    removeTodo(id: number): boolean {
        // find 는 해당 객체를 반환함. findIndex는 해당 index번호를 반납하고, 없으면 -1 을 반환함.
        const index = this.todos.findIndex(t => t.id === id);
        if (index === -1) return false;
        this.todos.splice(index, 1);
        return true;
    }

    listTodo() {
        return this.todos;
    }
}
