const Car = require('./Car');

class SUV extends Car {
    constructor(brand, model, autopilot) {
        super(brand, model);
        this.autopilot = autopilot;
    }

    autoPilot() {
        if (this.autopilot == true) {
            console.log(`${this.brand}, ${this.model} 의 자율주행을 시작합니다. 어디로 모실까요??`)
        } else {
            console.log(`자율주행 옵션이 구매되지 않았습니다. 900만원 더 내시오...`);
        }
    }
}

module.exports = SUV;
