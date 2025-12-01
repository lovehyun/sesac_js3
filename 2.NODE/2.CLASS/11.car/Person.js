const Car = require('./Car');

class Person {
    constructor(name, age, gender) {
        this.name = name;
        this.age = age;
        this.gender = gender;
    }

    greet() {
        console.log(`안녕, 나는 ${this.age}살, ${this.gender}, ${this.name}이야`);
    }

    // JS 는 동적 타입언어라서 getInCar(car)  <-- car가 뭔데?? 니 맘대로 넣으시오..
    // Java는 getInCar(Car car)  <-- 변수의 타입 지정.. 무조건 Car만 올 수 있음
    // TS는 getInCar(car: Car)   <-- TS는 딱딱한 언어.. 동적 타입 언어가 아님..
    // TS에서도 동적타입이 가능.. getInCar(car: any)  <-- 이렇게 절대 하지 마시오..
    getInCar(car) {
        if (car instanceof Car) {
            console.log(`나는 ${this.name} 이고, ${car.brand} ${car.model} 에 탑승합니다.`);
        } else {
            console.log(`올바른 자동차를 입력해주세요.`);
        }
    }
}

// module.exports 를 통해서, 내 파일 내에서 다른곳에서 가져다 쓸걸 알려줌.
module.exports = Person;
