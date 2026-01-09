import { Routes, Route } from 'react-router-dom';

import RootLayout from './layouts/RootLayout.jsx';

import Home from './pages/Home.jsx';
import Users from './pages/Users.jsx';
import About from './pages/About.jsx';
import NotFound from './pages/NotFound.jsx';

function App() {

    return (
        <Routes>
            {/* 상단의 네브바 */}
            <Route path="/" element={<RootLayout />}>

                {/* 물리적 페이지 */}
                <Route index element={<Home />} /> 

                {/* 정적 페이지 */}
                <Route path="users" element={<Users />} />
                <Route path="about" element={<About />} />

                {/* 404 페이지 디자인 */}
                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    );
}

export default App;
