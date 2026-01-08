import { useState, useEffect } from 'react';

// useEffect(() => {
//    의존성이 변경됐을때 실행되는 코드
//    return () => {
//         // 이 등록된 함수를 종료할때 cleanup 하는 코드
//    }
// }, [의존성변수]);


function App() {
    const [keyword, setKeyword] = useState('');
    const [users, setUsers] = useState([]);

    useEffect(() => {
        if (!keyword) {
            setUsers([]);
            return;
        }

        const timer = setTimeout(() => {
            // api호출
            console.log('검색 실행: ', keyword);

            fetch('https://jsonplaceholder.typicode.com/users')
                .then((res) => res.json())
                .then((data) => {
                    const filtered = data.filter((u) => 
                        u.name.toLowerCase().includes(keyword.toLowerCase()));
                    setUsers(filtered);
                })
        }, 500); // 0.5 초뒤에..

        // 이전에 timeout 설정한걸 그 다음 useeffect가 이전의 useeffect를 cleanup 하는 함수
        return () => clearTimeout(timer);

    }, [keyword]);

    return (
        <div>
            <h2>사용자 검색</h2>

            <input
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="검색어 입력"
            />

            <ul>
                {users.map((u) => (
                    <li key={u.id}>{u.name}</li>
                ))}
            </ul>
        </div>
    );
}

export default App;
