// 클래스를 만들고, 함수를 만들고, 그걸통해서 다양한 내가 원하는 정보를 셋팅하고 가져오는것.

// class Car() { constructor() {} }

class Circle {
    constructor(radius) {
        this.radius = radius;
    }

    get diameter() {  // getter 함수 = 변수처럼 접근해서 정보를 가져옴.
        return this.radius * 2;
    }

    set diameter(diameter) { // setter 함수 = 변수처럼 할당해서 정보를 설정함.
        this.radius = diameter / 2;
    }
}

const myCircle = new Circle(5); // 반지름 5짜리의 원을 만든겠다.
console.log("반지름: ", myCircle.radius);
// console.log(myCircle.get_diameter());
console.log("지름: ", myCircle.diameter);

myCircle.diameter = 20;
console.log("반지름: ", myCircle.radius);