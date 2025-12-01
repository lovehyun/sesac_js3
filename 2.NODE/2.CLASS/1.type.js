// 원시 타입 = Primitive Type
const a = 5;
console.log(typeof a);

const b = "hello"
console.log(typeof b);

// Object 타입 = Wrapper Class (원시 타입을 감싸 놓은..)
const c = new Number(5);
const d = new Number(7);
console.log(typeof c);
console.log(c instanceof Number);
console.log(d instanceof Number);

const e = new String("Hello");
const f = new String("World");
console.log(typeof e);
console.log(typeof f);

