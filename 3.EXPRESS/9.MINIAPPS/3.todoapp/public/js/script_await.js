document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM 로딩 완료');

    // 최초 시작하자마다 백엔드에 가지고 있는 목록 달라고 요청한다.
    async function getTodo() {
        const res = await fetch('/api/todos'); // 요청
        const data = await res.json();

        console.log(data);
        renderTodos(data);
    }

    getTodo();

    function renderTodos(todos) {
        const result = document.getElementById('todo-list');
        result.innerHTML = ''; // 기존에 있는거 지운다.

        // 새로운 todos를 반복적으로 하나하나 돌면서 하나하나 dom을 그린다.
        todos.forEach(todo => {
            const li = document.createElement('li');
            li.textContent = todo.todo; // todo라는 나의 변수 안에있는 todo라는 key의 값을 가져오는것.
            
            // if (todo.completed) {
            //     li.classList.add('completed');
            // } else {
            //     li.classList.remove('completed');
            // }
            li.classList.toggle('completed', todo.completed); // 위에 5줄짜리 코드를 한줄로...
            
            result.appendChild(li);

            // 토글도 추가할 예정
            li.addEventListener('click', async () => {
                const res = await fetch(`/api/todo/${todo.id}/completed`, { method: 'PUT' })
                const data = await res.json();
                console.log(data);
                if (data.success == true) {
                    getTodo(); // 요청이 끝났으면? 화면 업데이트
                } else {
                    alert('해당 항목은 찾을수 없습니다.');
                }
            });

            // 삭제버튼도 추가할 예정
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = "삭제";
            deleteBtn.addEventListener('click', async (e) => {
                e.stopPropagation(); // 위에 토글까지 이 이벤트가 전파되는것을 방지.
                const res = await fetch(`/api/todo/${todo.id}`, { method: 'DELETE'})
                const data = res.json(); // 리턴값 체크 아래에서 해야함
                getTodo();
            })
            li.appendChild(deleteBtn);

        });
    }
    
    // todo 추가
    const addBtn = document.getElementById('add-todo');
    addBtn.addEventListener('click', async () => {
        // 입력값 검증
        const inputText = document.getElementById('new-todo').value;
        const text = inputText.trim(); // 빈공백들 제거
        console.log(text);
        if (!text) return; // 빈칸이면 조용히 끝.. 안보냄!!

        const res = await fetch('/api/todo', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({todo:text}) // 문자화 또는 직렬화(serialization) 한다.
        })
        const data = res.json();
        getTodo();
    });
});
