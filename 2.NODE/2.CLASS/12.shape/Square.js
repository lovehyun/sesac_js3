const Shape = require('./Shape');

class Square extends Shape {
    constructor(length) {
        super("Square");
        this.length = length;
    }

    getArea() {
        return this.length ** 2; // this.length * this.length = this.length ** 2
                                // 주의 5 ^ 2 = 제곱인 언어가 대부분인데, 
                                // 하필 JS에서는 XOR 임.. 그래서 제곱이 아님으로 주의!!
    }
}

module.exports = Square;
