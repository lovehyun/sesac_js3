const express = require('express');
const session = require('express-session');
const sqlite3 = require('sqlite3').verbose(); 
const path = require('path');
const bcrypt = require('bcrypt');  // 암호화 모듈 로딩

const app = express();
const port = 3000;

// db에 연결
const db = new sqlite3.Database('users.db', (err) => {
    if (err) {
        console.error('DB 연결 실패:', err.message);
    } else {
        console.log('DB 연결 성공');
    }
})

app.use(express.json());
// app.use(express.urlencoded({extended: false}));

app.use(session({
    secret: 'this-is-my-secret-password',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 60000, // 세션의 유효 시간을 60000ms = 60s = 1분
    }
}));

app.use(express.static('public'));


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/profile', (req, res) => {
    const { user } = req.session; // 이전에 세션에 저장한 정보 다시 찾아오기

    if (user) {
        res.json({ id: user.id, username: user.username, message: "프로필 정보"});
    } else {
        res.status(401).json({ message: "로그인이 필요합니다."});
    }
});

app.get('/check-login', (req, res) => {
    if (req.session && req.session.user) { // 로그인 세션이 유효함
        return res.json({ id: req.session.user.id, username: req.session.user.username })
    }
    return res.json({ username: null }); // 로그인 세션이 없음
})

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    console.log(`사용자 입력값 확인: ${username}, ${password}`);

    const query = 'SELECT * FROM users WHERE username = ?';
    db.get(query, [username], async (err, row) => {
        if (err) {
            console.error("DB 쿼리 오류:", err.message);
            res.status(500).json({ message: '서버 오류' });
        }

        if (row) {
            // 일단 사용자 계정 존재하는것 확인.
            const match = await bcrypt.compare(password, row.password);
            if (match) {
                req.session.user = { id: row.id, username: row.username };
                res.json({ message: '로그인 성공'});
            } else {
                // 교육적으로 id/pw를 구분했을뿐, 실무적으로는 절대 id/pw중에 뭐가 틀렸는지 알려주지 않아야 함.
                res.status(401).json({ message: '로그인 실패 (pw를 확인해 주세요)'});
            }
        } else {
            // 교육적으로 id/pw를 구분했을뿐, 실무적으로는 절대 id/pw중에 뭐가 틀렸는지 알려주지 않아야 함.
            res.status(401).json({ message: '로그인 실패 (id를 확인해 주세요)'});
        }
    })
});

app.get('/logout', (req, res) => {
    // req.session.destroy();  // 이렇게만 해도 됨.

    req.session.destroy((err) => {
        if (err) {
            console.error("세션 삭제 실패", err);
            return res.status(500).json({ message: "로그아웃 실패"});
        }
        res.json({ message: "로그아웃 성공"});
    });
});

app.listen(port, () => {
    console.log('서버 레디');
});
