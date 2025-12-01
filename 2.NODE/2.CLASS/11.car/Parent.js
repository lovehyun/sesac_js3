const Person = require('./Person');

class Parent extends Person {
    constructor(name, age, gender, job) {
        super(name, age, gender);
        this.job = job;
    }

    say() {
        console.log(`${this.name}, ${this.age}, ${this.job} 입니다.`);
    }
}

module.exports = Parent;
