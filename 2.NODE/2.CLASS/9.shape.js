// Shape 이라는 제네릭(generic) 클래스를 정의해서... 넓이를 구하게 한다.
class Shape {
    getArea() {
        return 0;
    }
}

class Triangle extends Shape {
    constructor(base, height) {
        super(); // 나의 부모의 메모리 공간도 초기화 한다
        this.base = base;
        this.height = height;
    }

    getArea() {
        return this.base * this.height / 2;
    }
}

class Square extends Shape {
    constructor(sideLength) {
        super(); // this 는 나, super는 부모
        this.length = sideLength;
    }

    getArea() {
        return this.length * this.length;
    }
}

const mySquare = new Square(5);
console.log('정사각형의 넓이는: ', mySquare.getArea());

const myTriangle = new Triangle(5, 2);
console.log('삼각형의 넓이는: ', myTriangle.getArea());
