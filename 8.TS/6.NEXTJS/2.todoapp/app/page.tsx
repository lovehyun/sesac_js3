"use client"; // 클라이언트 컴포넌트로 지정

import { useState, FormEvent, useEffect } from "react";

type Todo = {
  id: number;
  text: string;
  done: boolean;
}

export default function Todo() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  // 최초에 백엔드로부터 목록 가져오기
  useEffect(() => {
    const fetchTodos = async() => {
      const res = await fetch("/api/todos");
      const data: Todo[] = await res.json();
      setTodos(data);
    }

    fetchTodos();
  }, []);

  const handleAdd = async (e: FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || loading) return;

    setLoading(true);

    const newTodo = {
      id: Date.now(),
      text,
      done: false
    };

    const res = await fetch("/api/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text })
    })

    setTodos((prev) => [newTodo, ...prev]); // 새로운 값을 맨 앞에 넣기
    setInput("");

    setLoading(false);
  }

  return (
    <main>
      <section>
        <h1>간단 Todo앱</h1>
        {/* 입력 폼 */}
        <form onSubmit={handleAdd}>
          <input 
            type="text" 
            placeholder="할일 입력" 
            value={input} 
            onChange={(e) => setInput(e.target.value)} />
          <button type="submit">
            추가
          </button>
        </form>
        {/* 출력 결과 */}
        {todos.length === 0 ? (
          <p>아직 할일이 없습니다.</p>
        ) : (
          <ul>
            {todos.map((todo) => (
              <li key={todo.id}>
                {todo.text}
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
