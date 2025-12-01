const Shape = require('./Shape');

class Circle extends Shape {
    // PI = 3.141592;

    constructor(radius) {
        super("Circle");
        this.radius = radius;
    }

    getArea() {
        // return this.PI * this.radius ** 2;
        return Math.PI * this.radius ** 2;
    }
}

module.exports = Circle;
