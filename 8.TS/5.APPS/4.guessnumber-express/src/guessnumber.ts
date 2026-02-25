// npm install -D @types/node
// 그리고 tsconfig 에 "types": ["node"] 추가하기

import readline from 'readline';

const rl: readline.Interface = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let attempts: number = 0;
const maxAttempts: number = 7;

export interface IGuessResponse {
    result: string,
    attempts: number,
    maxAttempts: number
}

export function guessNumber(target: number, guess: number): IGuessResponse {
    let guessResult: string = "";
    attempts++;

    if (guess < target) guessResult = 'Too Low';
    else if (guess > target) guessResult = 'Too High';
    else guessResult = 'Correct';

    return {
        result: guessResult,
        attempts,
        maxAttempts,
    }
}

export const targetNumber: number = Math.floor(Math.random()*100) + 1; // 1~100 정수
console.log('목표숫자: ', targetNumber);
