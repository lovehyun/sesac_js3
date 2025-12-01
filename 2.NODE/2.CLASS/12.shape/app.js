const Square = require('./Square');
const Triangle = require('./Triangle');
const Trapezium = require('./Trapezium');
const Circle = require('./Circle');
const Star = require('./Star');

const square = new Square(5);
const triangle = new Triangle(4, 3);
const trapezium = new Trapezium(4, 6, 5);
const circle = new Circle(3);
const star = new Star(5);

console.log('사각형의 넓이: ', square.getArea()); // 25
console.log('삼각형의 넓이: ', triangle.getArea()); // 6
console.log('사다리꼴의 넓이: ', trapezium.getArea()); // 25
console.log('원의 넓이: ', circle.getArea().toFixed(2)); // 28.27
console.log('별의 넓이: ', star.getArea());
// console.log('별의 넓이: ', star.getStarArea());

// Shape을 구현하고, 각각 Square, Triangle 등등이 Shape을 상속받으시오... getArea() 를 오버라이딩하시오.
// 5개의 파일을 만드시오.. Shape.js, Square.js, Triangle.js, Trapezium.js, Circle.js

//           Shape
//             │
//     ┌───────┼────────┬───────────┐
//     │       │        │           │
//  Square   Triangle  Trapezium   Circle


//           Shape (getArea 강제구현유도) - 추상클래스
//             │
//     ┌───────┼────────┬───────────┐
//     │       │        │           │
//  Square   Triangle  Trapezium   Circle
//     getArea() 를 너도나도 꼭 구현해야함...
