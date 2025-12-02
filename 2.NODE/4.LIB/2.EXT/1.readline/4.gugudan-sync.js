const readline = require('readline-sync');

rl = readline;

console.log('여기1');

function gugudan(num) {
    console.log(` === ${num} 단 ===`);
    for (let i = 1; i <= 9; i++) {
        console.log(`${num} x ${i} = ${num * i}`)
    }
}

// rl 이라는 변수를 통해서 키보드 입출력이 가능해졌음
const input = rl.question("원하는 단을 입력하시오: ");
console.log('입력값: ', input);
gugudan(input);

console.log('여기2');

// 안타깝게도.. 유니코드를 제대로 지원 못하는 경우들이 많음...
// 윈도우의 터미널을 한시적으로 chcp 65001