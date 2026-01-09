import { useState, useEffect, useMemo } from 'react';
import { fetchPosts } from '../api/usersApi.js';

const PAGE_SIZE = 20;

export default function Posts() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState('');
    const [page, setPage] = useState(1); // 1~5

    useEffect(() => {
        fetchPosts()
            .then((data) => {
                setPosts(data);
                setLoading(false);
            })
            .catch((err) => {
                setErrorMsg(err.message);
                setLoading(false);
            })
    }, []);

    // 페이지 처리를 위해서 필요한 변수와 연산들을 useMemo() 라는 hooks을 통해서 관리...
    // const totalPages = Math.max(1, Math.ceil(posts.length / PAGE_SIZE));
    // const start = (page - 1) * PAGE_SIZE;
    // const visible = posts.slice(start, start + PAGE_SIZE);
    const totalPages = useMemo(() => {
        return Math.max(1, Math.ceil(posts.length / PAGE_SIZE));
    }, [posts.length]); // 이 deps 를 지켜보다가 달라졌으면 그때 계산해서 갱신해라.

    const visible = useMemo(() => {
        const start = (page - 1) * PAGE_SIZE;
        return posts.slice(start, start + PAGE_SIZE);
    }, [posts, page]); // 여기는 두개를 바라봄

    if (loading) return <p>로딩 중...</p>;

    if (errorMsg) {
        return (
            <div>
                <h1>Posts</h1>
                <p style={{ color: 'crimson' }}>{errorMsg}</p>
            </div>
        );
    }

    return (
        <div>
            <h1>Posts</h1>

            <p style={{ color: '#555' }}>
                전체 {posts.length}개 ( 페이지 {page} / {totalPages} )
            </p>

            <ul>
                {visible.map((p) => (
                    <li key={p.id}>{p.title}</li>
                ))}
            </ul>

            {/* 페이지네이션 */}
            <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 12}}>
                <button 
                    disabled={page === 1}
                    onClick={() => setPage((prev) => prev - 1)}
                >
                    Prev
                </button>
                {Array.from({ length: totalPages }, (_, i) => {
                    const n = i + 1;
                    const isActive = n === page;

                    return (
                        <button 
                            key={n}
                            style={{ fontWeight: isActive ? '700' : '400' }}
                            onClick={() => setPage(n)}
                        >
                            {n}
                        </button>
                    )
                })}
                <button
                    disabled={page === totalPages}
                    onClick={() => setPage((prev) => prev + 1)}
                >
                    Next
                </button>
            </div>
        </div>
    )
}
