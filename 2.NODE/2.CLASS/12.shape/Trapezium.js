const Shape = require('./Shape');

class Trapezium extends Shape {
    constructor(upper, lower, height) {
        super("Square");
        this.upper = upper;
        this.lower = lower;
        this.height = height;
    }

    getArea() {
        return 0.5 * (this.upper + this.lower) * this.height;
    }
}

module.exports = Trapezium;
