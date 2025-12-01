const Person = require('./Person');

class Child extends Person {
    constructor(name, age, gender, school_year) {
        super(name, age, gender);
        this.school_year = school_year;
    }

    say() {
        console.log(`${this.name}, ${this.age}, ${this.school_year} 입니다.`);
    }
}

module.exports = Child;
