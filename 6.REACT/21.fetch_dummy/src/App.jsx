import { Routes, Route } from 'react-router-dom';

import RootLayout from './layouts/RootLayout.jsx';

import Home from './pages/Home.jsx';
import Users from './pages/Users.jsx';
import UserDetail from './pages/UserDetail.jsx';
import About from './pages/About.jsx';
import NotFound from './pages/NotFound.jsx';

function App() {

    return (
        <Routes>
            {/* 상단의 네브바 */}
            <Route path="/" element={<RootLayout />}>

                {/* 물리적 페이지 */}
                <Route index element={<Home />} /> 

                {/* 정적 페이지들 (/users, /about) */}

                {/* 사용자들 (/users, /users/:userId) 을 동일 계층으로 봐서 silbings */}
                <Route path="users" element={<Users />} />
                <Route path="users/:userId" element={<UserDetail />} />

                {/* 사용자들 (/users, /:userId)를 계층구조로 봐서 parent/child 관계 */}
                {/* <Route path="users">
                    <Route index element={<Users />} />
                    <Route path=":userId" element={<UserDetail />} />
                </Route> */}

                <Route path="about" element={<About />} />

                {/* 404 페이지 디자인 */}
                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    );
}

export default App;
