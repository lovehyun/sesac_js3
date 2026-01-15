import express from 'express';
import session from 'express-session';
import morgan from 'morgan';
// import dotenv from 'dotenv';
import 'dotenv/config';
import axios from 'axios';


/*******************
 * 주요 상수 설정
 *******************/

// 가상으로 __dirname 등등 만들기 (ESM 타입에서는 구 CommonJS의 __dirname 등이 존재하지 않음)
import { fileURLToPath } from 'url';
import path from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const NAVER_CLIENT_ID = process.env.NAVER_CLIENT_ID;
const NAVER_CLIENT_SECRET = process.env.NAVER_CLIENT_SECRET;
const NAVER_AUTH_REDIRECT_URL = process.env.NAVER_AUTH_REDIRECT_URL;

const NAVER_AUTH_URL = 'https://nid.naver.com/oauth2.0/authorize';
const NAVER_TOKEN_URL = 'https://nid.naver.com/oauth2.0/token';
const NAVER_USERINFO_URL = 'https://openapi.naver.com/v1/nid/me';


/*******************
 * 주요 서버 설정
 *******************/
const app = express();
const PORT = 3000;

// 0. 익스프레스 세션 설정하기
app.use(session({
    secret: 'my-secret-1234',
    resave: false,
    saveUninitialized: false
}));

app.use(express.static('public'));
app.use(morgan('dev'));

// 미들웨어 (로그인 체크)
function checkLogin(req, res, next) {
    if (req.session.user) return next();

    res.status(403).sendFile(path.join(__dirname, 'public', 'error.html'));
}

/*******************
 * 페이지 요청들
 *******************/
app.get('/login', (req, res) => {
    // *** 1단계. 사용자를 네이버로 보낸다 ***
    const authUrl = `${NAVER_AUTH_URL}?response_type=code&client_id=${NAVER_CLIENT_ID}&redirect_uri=${NAVER_AUTH_REDIRECT_URL}&state=SESAC`;
    res.redirect(authUrl);
});

app.get('/dashboard', checkLogin, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});

app.get('/user', checkLogin, (req, res) => {
    // 1. 사용자 페이지 전달하기
     res.sendFile(path.join(__dirname, 'public', 'user.html'));
});

app.get('/logout', (req, res) => {
    // 4. 사용자 로그아웃 처리하기 (우리 세션 로그아웃)
    req.session.destroy(() => {
        res.redirect('/'); // 로그아웃 성공시 / 로 보내기
    });
});

// 5. 
// 5-1. / 루트에 접속
// 5-2. 네이버 로그인 -> 성공시 dashboard로 보내기  (/dashboard)
// 5-3. 사용자 페이지 가보기 (/user)
// 5-4. 대시보드에 있는 로그아웃하기 -> /로 보내기  (/)
// 5-9. 로그인 안한상태에서 /dashboard로 가기 또는 /user 로 가기 -> 이걸 error.html 로 보내는 기능을 만들기
//      미들웨어를 통해서... 내가 xxxx 페이로 갈때마다, 가기 전에 중간에 미들웨어를 들러서.. 
//      인증이 된 사용자인지 (쉬운말로 세션 유무판단) 해서.. 안했으면 (없으면) /error.html 로 보내기.. 

/*******************
 * API 요청들
 *******************/
app.get('/api/user', (req, res) => {
    // 2. 세션에 저장해둔 사용저 정보 전달하기 (json 으로 우리의 FE에...)
    if (req.session?.user) {
        res.json(req.session.user);
    }
});

// 3. 아래 함수 어딘가에 로그인 성공시 우리 세션에 사용자 정보 저장
app.get('/api/oauth2/callback', async (req, res) => {
    const { code, state } = req.query;
    console.log('사용자가 로그인후 받아온 코드: ', code, state);

    // *** 2단계. 사용자가 받아온 코드(토큰)를 검증한다. ***
    const tokenUrl = 
        `${NAVER_TOKEN_URL}?grant_type=authorization_code` +
        `&client_id=${NAVER_CLIENT_ID}` +
        `&client_secret=${NAVER_CLIENT_SECRET}` +
        `&code=${code}` +
        `&state=${state}`;

    // 위 정보를 담아서 다시 네이버에서 token 을 요청한다.
    console.log('네이버에 확인중: ', tokenUrl);
    const tokenResp = await axios.get(NAVER_TOKEN_URL, {
        params: {
            grant_type: 'authorization_code',
            client_id: NAVER_CLIENT_ID,
            client_secret: NAVER_CLIENT_SECRET,
            code: code,
            state: state
        }
    });

    const tokenData = tokenResp.data;
    console.log('최종토큰모음: ', tokenData);

    // *** 3단계. 확인된 최종 토큰(access-token) 을 사용해서, 사용자의 정보를 받아온다. ***
    console.log('필요한 access-token:', tokenData.access_token);
    const userInfoResp = await axios.get(NAVER_USERINFO_URL, {
        headers: {
            Authorization: `Bearer ${tokenData.access_token}`
        }
    });

    const userInfoData = userInfoResp.data;
    console.log(userInfoData);

    const userInfo = userInfoData.response;
    // 사용자 정보 세션에 저장하기
    req.session.user = {
        id: userInfo.id,
        name: userInfo.name || userInfo.nickname || 'Unknown',
        nickname: userInfo.nickname || 'Unknown',
        email: userInfo.email || 'N/A',
        profileImage: userInfo.profileImage || null,
        age: userInfo.age || 'N/A',
        gender: 
            userInfo.gender === 'M' 
                ? '남' 
                : userInfo.gender === 'F' 
                ? '여' 
                : '미동의',
        birthdate: userInfo.birthday || 'N/A'
    }

    res.redirect('/dashboard'); // 로그인 후 대시보드로 보내기
});

app.listen(PORT, () => {
    console.log('서버 레디');
});
