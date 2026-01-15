import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config({ quiet: 'true' });

const app = express();
const PORT = 3000;

const NAVER_CLIENT_ID = process.env.NAVER_CLIENT_ID;
const NAVER_CLIENT_SECRET = process.env.NAVER_CLIENT_SECRET;
const NAVER_AUTH_REDIRECT_URL = process.env.NAVER_AUTH_REDIRECT_URL;

const NAVER_AUTH_URL = 'https://nid.naver.com/oauth2.0/authorize';
const NAVER_TOKEN_URL = 'https://nid.naver.com/oauth2.0/token';
const NAVER_USERINFO_URL = 'https://openapi.naver.com/v1/nid/me';

app.use(express.static('public'));
app.use(morgan('dev'));

app.get('/login', (req, res) => {
    // *** 1단계. 사용자를 네이버로 보낸다 ***
    const authUrl = `${NAVER_AUTH_URL}?response_type=code&client_id=${NAVER_CLIENT_ID}&redirect_uri=${NAVER_AUTH_REDIRECT_URL}&state=SESAC`;
    res.redirect(authUrl);
});

app.get('/api/oauth2/callback', async (req, res) => {
    const { code, state } = req.query;
    console.log('사용자가 로그인후 받아온 코드: ', code, state);

    // *** 2단계. 사용자가 받아온 코드(토큰)를 검증한다. ***
    // 사용자가 가지고 온 code 가 맞는지, 다시 내가 네이버에게 물어본다.
    // const tokenUrl = new URL(NAVER_TOKEN_URL);
    // tokenUrl.search = new URLSearchParams({
    //     grant_type: 'authorization_code',
    //     client_id: NAVER_CLIENT_ID,
    //     client_secret: NAVER_CLIENT_SECRET,
    //     code: code,
    //     state: state
    // });
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

    res.json(userInfoData); // 내가 원하는 정보로 가공해서 우리의 FE에 보내기...
});

app.listen(PORT, () => {
    console.log('서버 레디');
});
