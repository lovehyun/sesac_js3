// npm install -D @types/node
// 그리고 tsconfig 에 "types": ["node"] 추가하기

import readline from 'readline';

const rl: readline.Interface = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let attempts: number = 0;
const maxAttempts: number = 7;

function guessNumber(target: number, guess: number): string {
    if (guess < target) return 'Too Low';
    if (guess > target) return 'Too High';
    return 'Correct';
}

const targetNumber: number = Math.floor(Math.random()*100) + 1; // 1~100 정수
console.log('목표숫자: ', targetNumber);

// const userGuess: number = 50; // 사용자가 찍는 숫자
// console.log(guessNumber(targetNumber, userGuess));

function askGuess(): void {
    attempts++;

    rl.question(`(${attempts}/${maxAttempts}) 숫자를 입력하세요: `, (input: string) => {
        const userGuess: number = Number(input);

        if (isNaN(userGuess)) {
            console.log('숫자만 입력하시오.');
            attempts--;
            return askGuess();
        }

        const result: string = guessNumber(targetNumber, userGuess);
        console.log(result);

        if (result == 'Correct') {
            console.log('축하합니다! 정답을 맞췄습니다. 끝!');
            rl.close();
            return;
        }

        if (attempts < maxAttempts) {
            askGuess(); // 다음 시도
        } else {
            console.log(`실패. 모든 횟수를 다 사용하였습니다. 정답은 ${targetNumber} 입니다.`);
            rl.close();
        }
    })
}

askGuess();
