class Car {
    constructor(name) {
        this.name = name;
    }
}

class Person {
    constructor(name) {
        this.name = name;
    }

    toString() {  // 이 함수를 오버라이딩 하면?? 그럼 나를 문자열로 출력할수 있음.
        // return this.name;
        // return `"${this.name}"`;
        return `"나의이름은: ${this.name}"`;
    }
}

const myCar = new Car("테슬라");
const myPerson = new Person("나");

console.log(myCar);
console.log(`나의 자동차는 ${myCar} 입니다.`);
console.log(`나는 ${myPerson} 입니다.`);
console.log(`나는 ${myPerson.name} 입니다.`);
