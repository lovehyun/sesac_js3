// npm i @google/generative-ai <-- 구버전 (현재는 deprecated)
// npm i @google/genai
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config({ quiet: true });

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function ask_question(question) {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash', // 원하는 모델 선택
        // model: 'gemini-3-flash-preview', // 원하는 모델 선택
        contents: question
    })

    console.log(response.text);
}

ask_question('인공지능이 무엇인지 3문장으로 번호를 붙여서 답변하시오.');
// ask_question('1번에 더 상세히 설명해줘');
