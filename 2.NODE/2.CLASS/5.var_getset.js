// 꼭 class만 객체가 아니고, 이렇게 변수에 {} 한것도 객체임..
const myVarObject = {
    _age: 10,

    get age() {
        return this._age;
    },

    set age(newAge) {
        if (newAge > 0) {
            this._age = newAge;
        } else {
            console.log("나이는 0보다 커야 합니다.")
        }
    }
}

console.log(myVarObject._age); // private 변수라서, 접근은 가능하지만, 하지 마시오 라는 의미임.
console.log(myVarObject.age); // 이렇게 getter함수를 통해서 접근하시오.
myVarObject.age = 20;
console.log(myVarObject.age);
myVarObject.age = -5;
