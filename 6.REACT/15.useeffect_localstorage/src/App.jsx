import { useState, useEffect } from 'react';
import './App.css';

const KEY = 'theme_dark'; // 로컬 스토리지에 저장할 변수

function App() {
    const [darkMode, setDarkMode] = useState(() => {
        const saved = localStorage.getItem(KEY);
        return saved === 'true';
    });

    // React 17까지의 구버전 방식. React 18 부터는 위의 방식을 권장함.
    // useEffect(() => {
    //     const saved = localStorage.getItem(KEY);
    //     if (saved === 'true') setDarkMode(true);
    // }, []); // [] <-- 조건 없이 최초 한번만 호출됨.

    useEffect(() => {
        localStorage.setItem(KEY, String(darkMode))
        document.documentElement.dataset.theme = darkMode ? 'dark' : 'light';
    }, [darkMode])

    return (
        <div className="page">
            <div className="card">
                <h2>테마 설정</h2>

                <label className="row">
                    <input 
                        type="checkbox" 
                        checked={darkMode} 
                        onChange={(e) => setDarkMode(e.target.checked)} 
                    />
                    다크모드
                </label>

                <p className="muted">현재 상태: {darkMode ? "ON" : "OFF"}</p>

                <button className="btn" onClick={() => alert('동작 확인')}>
                    버튼 예시
                </button>
            </div>
        </div>
    );
}

export default App;
