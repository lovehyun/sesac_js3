import express, { Express, Request, Response } from 'express';
import path from 'path';
import { targetNumber, guessNumber, IGuessResponse } from './guessnumber';

const app: Express = express();
const port: number = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

app.post('/api/game/start', (req: Request, res: Response) => {
    res.json({ message: '게임 시작됨', maxAttempts: 7});
})

app.post('/api/game/guess', (req: Request, res: Response<IGuessResponse>) => {
    const { guess } = req.body;

    const result = guessNumber(targetNumber, guess);

    res.json(result);
})

app.listen(port, () => {
    console.log('서버 레디');
});
