// npm i express dotenv @google/genai
import express from 'express';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import morgan from 'morgan';

dotenv.config({ quiet: true });

const app = express();
app.use(express.json());
app.use(express.static('public'));
app.use(morgan('dev'));

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

let history = []; // 데모용 저장소임. 사용자 세션 구분도 안되고... 무한 증식해서, 나중에 토큰 초과 오류가 발생...

app.post('/api/chat', async (req, res) => {
    const { message } = req.body;

    history.push({ role: 'user', parts: [{ text: message }]});
    history = history.slice(-20); // 최근 20개만 남겨놓고 다 버린다.

    console.log('--- 질문 시작 ---');
    console.log(history);
    console.log('--- 질문 끝 ---');

    try {
        const response = await ai.models.generateContent({
            // model: 'gemini-2.5-flash',
            model: 'gemini-2.0-flash-lite',
            contents: history
        });

        console.log(response);
        const reply = response.text;
        
        history.push({ role: 'model', parts: [{ text: reply }]});

        res.json({ reply });
    } catch (e) {
        console.log(e);
        res.status(500).json({ error: '알수 없는 오류...' }); // 이런거 쓰지말고 꼭 적절한 메시지로 쓸것 (회사에서는)
    }
});

app.listen(3000, () => {
    console.log('서버 레디');
});
