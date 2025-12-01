const Shape = require('./Shape');

class Star extends Shape {
    constructor(length) {
        super("Star");
        this.length = length;
    }

//     getStarArea() {
//         return this.length * 5 ** 2; // 내마음대로 공식
//     }

    getArea() {
        return this.length * 5 ** 2; // 내마음대로 공식
    }
}

module.exports = Star;
