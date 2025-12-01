class Animal {
    constructor(name) {
        this.name = name;
    }

    makeSound() {
        return "아무말이나..."
    }
}

// 강아지는 동물(Animal) 의 기능을 다 받아옴... 그래서 +alpha를 더 가져갈수 있음
class Dog extends Animal {
    makeSound() {  // overriding 이라고 부름.. 원래 상속받은 부모의 기능을 대체함.
        return "멍멍"
    }
}

class Cat extends Animal {
    makeSound() {
        return "야옹"
    }
}

const myDog = new Dog("Doggy");
console.log(myDog.name);
console.log(myDog.makeSound());

const myCat = new Cat("Kitty");
console.log(myCat.name);
console.log(myCat.makeSound());

const myCow = new Animal("한우");
console.log(myCow.name);
console.log(myCow.makeSound());
