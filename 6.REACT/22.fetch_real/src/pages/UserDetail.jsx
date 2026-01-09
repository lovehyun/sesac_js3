import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

import { fetchUserById } from '../api/usersApi';

export default function UserDetail() {
    const { userId } = useParams();
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState('');

    useEffect(() => {
        fetchUserById(userId)
            .then((data) => {
                setUser(data);
                setLoading(false);
            })
            .catch((err) => {
                setErrorMsg(err.message);
                setLoading(false);
            })
    }, [userId]); // userId 가 바뀔때마다 새로 fetch 해오기
                  // 그러나, 지금은 어차피 이 페이지가 불릴때마다 userId가 바뀌어서 올거라서 무방함.

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
            <h1>User Detail</h1>
            <div style={{ padding: 12, border: '1px solid #ddd', borderRadius: 8, maxWidth: 400 }}>
                <div>
                    <b>ID</b>: {user.id}
                </div>
                <div>
                    <b>Name</b>: {user.name}
                </div>
                <div>
                    <b>Email</b>: {user.email}
                </div>
            </div>

            {/* 뒤로가기 버튼 추가 - 방식 두가지 (브라우저 히스토리, 또는 내가 아는 링크로 직접) */}
            <div style={{ marginTop: 12, display: 'flex', gap: 8}}>
                <button onClick={() => navigate(-1)}>뒤로</button>
                <Link to="/users">목록으로</Link>
            </div>
        </div>
    )
}