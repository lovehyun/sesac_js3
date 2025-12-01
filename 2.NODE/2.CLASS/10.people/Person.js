class Person {
    constructor(name) {
        this.name = name;
    }

    greet() {
        console.log(`안녕, 나는 ${this.name}이야`);
    }
}

// module.exports 를 통해서, 내 파일 내에서 다른곳에서 가져다 쓸걸 알려줌.
module.exports = Person;
