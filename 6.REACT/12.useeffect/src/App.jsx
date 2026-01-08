import { useState, useEffect } from 'react';
import UserCard from './components/UserCard';

function App() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then((res) => res.json())
            .then((data) => {
                setUsers(data);
                setLoading(false);
            })
    }, []);

    if (loading) return <p>로딩 중...</p>;

    function removeUser(id) {
        setUsers((prev) => prev.filter((u) => u.id !== id));
    }

    return (
        <>
            <h1>useEffect를 통한 외부 API 요청</h1>
            <h2>사용자 목록</h2>
            <div style={{ padding: 16, maxWidth: 500 }}>
                <ul style={{ listStyle: 'none', padding: 0}}>
                    {users.map((u) => (
                        <UserCard key={u.id} user={u} onRemove={removeUser} />
                    ))}
                </ul>
            </div>
        </>
    );
}

export default App;
