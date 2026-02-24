class Person {
    // public name: string; // 외부에서 접근 가능
    public readonly name: string; // 외부에서 접근 가능
    private age: number; // 클래스 내부에서만 접근 가능
    protected address: string; // 클래스와 자식 클래스에서 접근 가능

    constructor(name: string, age: number, address: string) {
        this.name = name;
        this.age = age;
        this.address = address;
    }

    getAge() {
        return this.age;
    }
}

const john = new Person("John", 30, "서울시 강남구 123");
// console.log(`John정보: ${john.name}, ${john.age}`);
// console.log(`John정보: ${john.name}, ${john.address}`);
console.log(`John정보: ${john.name}, ${john.getAge()}`);
// john.name = "Bob";
