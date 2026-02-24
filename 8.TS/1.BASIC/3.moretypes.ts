let numbers: number[] = [1,2,3,4,5];
console.log(`Numbers: ${numbers}`);

let names: string[] = ["Sesac", "Hello", "World"];
console.log(`Names: ${names}`);

// 튜플 타입
let person: [string, number] = ["Alice", 30];
console.log(`Person Tuple: ${person[0]}, ${person[1]}`);

// person = ["Bob"] // 이런거 안됨. 무조건 정의한 타입으로 할당해야함
person = ["Bob", 20];
console.log(`Person Type: ${person}`);

// 구조 분
const [username, age] = person;
console.log(`Person Name: ${username}, Age: ${age}`);

// 나만의 타입을 정의 하는 것 중 첫번째 방법: enum
enum Direction {
    Up, // 0
    Down, // 1
    Left, // 2
    Right // 3
}

let move: Direction = Direction.Up;
console.log(`Move Direction: ${move}`);

move = Direction.Left;
console.log(`Move Direction: ${move}`); // 숫자 출력: 2
console.log(`Move Direction: ${Direction[move]}`); // 문자 출력: Left

// 유니온 타입 (두가지 이상의 타입이 올 수 있는 변수)
let id: number | string;
id = 123;
console.log(`ID 숫자: ${id}`);
id = "ABC";
console.log(`ID 문자: ${id}`);

// 나만의 타입을 지정하는 두번째 방식: 리터럴 타입(literal)
let direction: "left" | "right" | "up" | "down";

direction = "left"; // 자동완성 안됨
console.log(`Direction: ${direction}`);
