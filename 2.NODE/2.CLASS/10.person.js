class Person {
    constructor(name, age, gender) {
        this.name = name;
        this.age = age;
        this.gender = gender;
    }

    greet() {
        console.log(`안녕하세요, 저는 ${this.age}살, ${this.name} 입니다.`);
    }

    walk() {
        console.log(`${this.name} 은/는 걷고 있습니다.`);
    }

    eat() {
        console.log(`${this.name} 은 ${this.place} 에서 밥을 먹고 있습니다.`);
    }

    goto(place) {
        this.place = place;
    }
}

const person1 = new Person("철수", 25, "남성");
// console.log(person1.name);
person1.greet();
person1.walk();
person1.place = "공원";  // 직접 갑자기 없던 변수를 막 내맘대로 할당 할수는 있지만, 하기 시작하면, 코드가 복잡해짐.. 즉 하지마시오..
person1.eat();

const person2 = new Person("영희", 22, "여성");
person2.greet();
person2.walk();
person2.eat();
person2.goto("편의점"); // 올바르게 getter/setter 또는 함수를 통해서 접근..
person2.eat();
