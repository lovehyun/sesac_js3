import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { fetchUsers, deleteUserById } from '../api/usersApi';

export default function Users() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState('');
    const [deletingId, setDeletingId] = useState(null);

    useEffect(() => {
        fetchUsers()
            .then((data) => {
                setUsers(data);
                setLoading(false);
            })
            .catch((err) => {
                setErrorMsg(err.message);
                setLoading(false);
            })
        
    }, []); /* 최초 한번만 실행 */

    async function deleteUser(id) {
        // 이미 지우는게 진행중이면 재진입 불가
        if (deletingId !== null) return;

        setDeletingId(id);
        try {
            await deleteUserById(id);
            
            // 성공메시지가 오면??
            setUsers((prev) => prev.filter((u) => u.id !== id));
        } catch (err) {
            alert(err.message);
        } finally {
            setDeletingId(null);
        }
    }

    /* 아래는 DOM 랜더링 코드만 추가할것 */
    if (loading) return <p>로딩 중...</p>
    if (errorMsg) {
        return (
            <div>
                <h1>Users</h1>
                <p style={{ color: 'crimson'}}>에러: {errorMsg}</p>
                <p>잠시 후 다시 시도해 주세요...</p>
                <button onClick={() => window.location.reload()}>새로고침</button>
            </div>
        )
    }
    return (
        <div>
            <h1>Users</h1>
            <ul>
                {users.map((u) => {
                    const isDeleting = deletingId === u.id;

                    return (
                        <li key={u.id}>
                            <Link to={`/users/${u.id}`}>{u.name}</Link>

                            <button 
                                style={{ marginLeft: 8 }}
                                disabled={deletingId != null}
                                onClick={() => deleteUser(u.id)}
                            >
                                {isDeleting ? '삭제 중...' : '삭제'}
                            </button>
                        </li>
                    )
                })}
            </ul>

            {users.length === 0 && <p>표시할 사용자가 없습니다.</p>}
        </div>
    )
}
