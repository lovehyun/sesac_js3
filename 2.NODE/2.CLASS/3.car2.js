class Car {
    constructor(make, model) { // 객체가 만들어질때 불리는 기본 함수
        this.brand = make; // 여기에서 this는 객체 자신을 말함.
        this.model = model;
    }

    welcome() {
        return this.brand + " " + this.model + " 입니다."
    }

    drive() {
        return `${this.model} 가 자동운전을 시작합니다.`
    }
}

const myCar = new Car("현대", "K5")
console.log(myCar.brand);
console.log(myCar.model);
console.log(myCar.welcome());
console.log(myCar.drive());

const yourCar = new Car("기아", "모닝");
console.log(yourCar.brand);
console.log(yourCar.model);
console.log(yourCar.welcome());
console.log(yourCar.drive());