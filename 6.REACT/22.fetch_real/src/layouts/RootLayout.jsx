import { NavLink, Outlet } from 'react-router-dom';
// 상단 메뉴(Navbar 를 클릭해서 이동하는 링크정의를 NavLink)
// 메뉴 아래 나오는 실제 페이지가 표시될곳 Outlet

const linkStyle = ({ isActive }) => ({
    textDecoration: 'none',
    fontWeight: isActive ? 700 : 400,
})

export default function RootLayout() {
    return (
        <div style={{ maxWidth: 900, margin: '0 auto', padding: 16}}>
            <nav style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
                <NavLink to="/" end style={linkStyle}>
                    Home
                </NavLink>
                <NavLink to="/users" style={linkStyle}>
                    Users
                </NavLink>
                <NavLink to="/posts" style={linkStyle}>
                    Posts
                </NavLink>
                <NavLink to="/about" style={linkStyle}>
                    About
                </NavLink>
            </nav>

            <hr />

            {/* 네브링크로 이동했을때 여기 아래에 차일드(child)를 랜더링 */}
            <Outlet />
        </div>
    )
}