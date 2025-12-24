const express = require('express');
const morgan = require('morgan');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const db = new sqlite3.Database('users.db');

app.use(morgan('dev'));
app.use(express.static('public'));

/*******************************
 * 사용자 요청 페이지 전달
 *******************************/
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'users.html'));
});

app.get('/users/:id', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'user_detail.html'));
});

/*******************************
 * 백엔드 API 요청
 *******************************/
app.get('/api/users', (req, res) => {
    const searchName = req.query.name || '';
    const pageNum = req.query.page || 1;
    const itemsPerPage = 20; // 고정 (하드코딩은 좋은건 아님)
    let totalPages = 0;

    // searchName 이 있거나 없거나에 따라서 if else 로 분기해도 되지만, 그게 결국 중복 코드라...
    // 아래처럼 하나로 통일...
    // 이거 나중에 "이름/나이" 검색 등으로 확장해보기...
    
    // 총 검색 결과 갯수 구하기
    const queryCount = 'SELECT COUNT(*) AS count FROM users WHERE name LIKE ?';
    db.get(queryCount, [`%${searchName}%`], (err, row) => {
        const searchCount = row.count;
        totalPages = Math.ceil(searchCount / itemsPerPage);

        console.log('검색 갯수: ', searchCount);
        console.log('페이지 갯수: ', totalPages);

        // 여기서 왜 이거 nested 형태로 구현해야하는지 생각해보기 (비동기)

        const query = 'SELECT * FROM users WHERE name LIKE ? LIMIT ?';
        db.all(query, [`%${searchName}%`, itemsPerPage], (err, rows) => {
            if (err) {
                console.error('사용자 조회 실패: ', err);
                return res.status(500).json({ error: '사용자 조회에 실패하였습니다.'});
            }

            res.json({totalPages: totalPages, data: rows});  // 이 구조가 어떻게 생긴건지 잘~ 생각해보기.
        });
    });
});

app.get('/api/users/:id', (req, res) => {
    const userId = req.params.id;

    const query = 'SELECT * FROM users WHERE Id=?';

    db.get(query, userId, (err, row) => {
        if (err) {
            console.error('사용자 조회 실패: ', err);
            return res.status(500).json({ error: '사용자 조회에 실패하였습니다.'});
        }

        if (!row) {
            console.error('사용자 조회 실패: ', err);
            return res.status(404).json({ error: '사용자가 존재하지 않습니다.'});
        }

        res.json(row);
    })
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
