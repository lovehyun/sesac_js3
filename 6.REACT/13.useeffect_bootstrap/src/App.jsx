import { useState, useEffect } from 'react';
import UserCard from './components/UserCard';
import SearchInput from './components/SearchInput';

function App() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [keyword, setKeyword] = useState('');

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then((res) => res.json())
            .then((data) => {
                setUsers(data);
                setLoading(false);
            })
    }, []);

    function removeUser(id) {
        setUsers((prev) => prev.filter((u) => u.id !== id));
    }

    const filteredUsers = users.filter(u => 
        u.name.toLowerCase().includes(keyword.toLowerCase())
    );

    if (loading) return <p>로딩 중...</p>;
    return (
        <>
            <h2 className="m-4">사용자 목록</h2>
            <div className="container pb-4">
                {/* 검색 박스를 추가하고 사용자 필터링 하기 */}
                <SearchInput value={keyword} onChange={setKeyword} />

                <div className="row">
                    {filteredUsers.map((u) => (
                        <div className="col-md-6 col-lg-4" key={u.id}>
                            <UserCard user={u} onRemove={removeUser} />
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default App;
