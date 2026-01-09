import { useState, useEffect } from 'react';
import { fetchUserById } from '../api/dummyUsersApi';
import { useParams, useNavigate, Link } from 'react-router-dom';

export default function UserDetail() {
    const { userId } = useParams();
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUserById(userId)
            .then((data) => {
                setUser(data);
                setLoading(false);
            })
    }, [userId]); // userId 가 바뀔때마다 새로 fetch 해오기
                  // 그러나, 지금은 어차피 이 페이지가 불릴때마다 userId가 바뀌어서 올거라서 무방함.

    /* 아래는 DOM 랜더링 코드만 추가할것 */
    if (loading) return <p>로딩 중...</p>
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