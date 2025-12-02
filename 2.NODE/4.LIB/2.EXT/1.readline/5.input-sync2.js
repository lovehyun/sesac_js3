const rl = require('readline-sync');

const name = rl.question('당신의 이름은 무엇인가요? ');
console.log(`안녕하세요, ${name} 님`);

const age = rl.question('당신의 나이는 몇 살인가요? ');
console.log(`그럼.. 말 놔도.... ${age} 님`);

