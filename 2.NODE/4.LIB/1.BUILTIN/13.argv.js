// const args = process.argv;
const args = process.argv.slice(2); // 리스트에서 앞에 2개 인자 없애라

console.log(args);
console.log('사용자수: ', args[0]);
console.log('상점수: ', args[1]);
console.log('주문수: ', args[2]);

console.log('당신은 사용자수를 몇명으로 생성하시겠습니까?');
