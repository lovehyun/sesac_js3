// Car를 상속받은 Sedan, SUV 도 있음

const SUV = require('./SUV');  // ./ 는 현재 폴더의 SUV 파일을 찾으시오 ../ 상위디렉토리
const Sedan = require('./Sedan');
const Car = require('./Car');

const dadCar = new SUV('테슬라', 'Model X', false);
dadCar.autoPilot();

const dadCar2 = new SUV('테슬라', 'Model X', true);
dadCar2.autoPilot();


// Person 을 상속받아서 Parent, Child 가 있음
const Parent = require('./Parent');
const Child = require('./Child');

const dad = new Parent('빌게이츠', 40, '남성', '회사원');
const son = new Child('주니어빌', 20, '남성', '대학교 1학년');

dad.say();
son.say();


class soju {
    brand = "진로"
    model = "참이슬"
}

const myCar = new soju();

console.log("나는 무엇인가 Car: ", dadCar instanceof Car);
console.log("나는 무엇인가 Sedan: ", dadCar instanceof Sedan);
console.log("나는 무엇인가 SUV: ", dadCar instanceof SUV);

// 사람이 차를 타는 함수 구현
dad.getInCar(dadCar);
son.getInCar(myCar);

// 차에는 움직이는 함수 구현
// dadCar.start();
// dadCar.autoPilot('미술관');
// son.playInCar();
// dadCar.stop();
