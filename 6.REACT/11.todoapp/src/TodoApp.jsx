import { useState } from 'react';

import TodoForm from './components/TodoForm.jsx';
import TodoList from './components/TodoList.jsx';

export default function TodoApp() {
    const [todos, setTodos] = useState([
        { id: 1, text: 'React 공부하기', done: false },
        { id: 2, text: 'Vite 공부하기', done: false },
    ]);

    // Controlled 상태 
    const [text, setText] = useState('');

    function addTodo(e) {
        e.preventDefault();

        const trimmed = text.trim();
        if (!trimmed) return;

        const newTodo = {
            id: Date.now(), // 가장 간단하게 id를 만들기
            text: trimmed,
            done: false,
        }

        setTodos((prev) => [newTodo, ...prev]); // 새로운걸 앞에 추가
        setText('');
    }

    function toggleTodo(id) {
        // 직접 direct로 변경 하면 안되고,
        // 멤버의 값만 바꾸면 안됨...
        // const todo = todos.find(t => t.id === id);
        // todo.done = !todo.done;

        setTodos((prev) =>
            // prev.map((t) => 
            //     (t.id === id ? { ...t, done: !t.done } : t)));

            prev.map(t => {
                if (t.id !== id) return t;  // 클릭된게 아니면, 그대로 둠
                return { ...t, done: !t.done }  // 클릭된 항목만 다른 컬럼은 두고, done 필드만 토글
            }));
    }

    function removeTodo(id) {
        setTodos((prev) => prev.filter((t) => t.id !== id));

        // setTodos(prev => {
        //     const filteredTodos = prev.filter(todo => todo.id !== id);
        //     return filteredTodos;
        // });

        // 아래처럼 하면 안됨.
        // const index = todos.findIndex(t => t.id === id);
        // todos.splice(index, 1); // 원본 데이터를 건드림.. 
        // setTodos(todos); // 위에서 이미 원본 데이터가 달라져서 setTodos를 하더라도, 상태 변경된것을 비교(diff) 하지 못함.
    }

    return (
        <>
            <div style={{ padding: 16, maxWidth: 500 }}>
                <h2>할일 목록</h2>
                <TodoForm text={text} setText={setText} onAdd={addTodo} />
                <TodoList todos={todos} onToggle={toggleTodo} onRemove={removeTodo} />
            </div>
        </>
    );
}
