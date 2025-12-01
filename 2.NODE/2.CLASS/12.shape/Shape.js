class Shape {
    constructor(name) {
        this.name = name;
    }

    // getArea() {
    //     return 0;
    // }

    getArea() {  // 이걸 abstract class 처럼, abstract method 처럼.. 나를 강제로 구현해주시오..
        throw Error("나를 좀 구현해주시오");
    }
}

module.exports = Shape;
