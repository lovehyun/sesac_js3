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

    hasBatchim(word) {
        if (!word || word.length === 0) return false;

        const lastChar = word[word.length - 1];
        const code = lastChar.charCodeAt(0);

        // 한글 범위(가~힣)가 아니면 그냥 받침 없는 것으로 처리
        if (code < 0xAC00 || code > 0xD7A3) return false;

        const jong = (code - 0xAC00) % 28;   // 종성(받침) 인덱스
        return jong !== 0;                   // 0이면 받침 없음
    }

    josa(word, type) {
        const batchim = this.hasBatchim(word);

        switch (type) {
            case '이가':
                return batchim ? '이' : '가';
            case '을를':
                return batchim ? '을' : '를';
            case '은는':
                return batchim ? '은' : '는';
            case '과와':
                return batchim ? '과' : '와';
            default:
                return '';
        }
    }

}

class Employee extends Person {
    constructor(name, age, gender, jobTitle, salary) {
        super(name, age, gender);
        this.jobTitle = jobTitle;
        this.salary = salary;
    }

    work() {
        console.log(`${this.name} 이 ${this.jobTitle} 의 일을 열심히 하고 있습니다.`);
    }
}

const person1 = new Person("철수", 25, "남성");
const employee1 = new Employee("영희", 22, "여성", "소프트웨어개발자", 3000);

person1.greet();
person1.walk();
employee1.greet();
employee1.work();
employee1.walk();
employee1.work();
// person1.work(); // 백수가 어딜? 일 못함...

class Student extends Person {
    constructor(name, age, gender, studentId, major) {
        super(name, age, gender);
        this.studentId = studentId;
        this.major = major;
    }

    study() {
        console.log(`${this.name} (이/가) 전공인 ${this.major} (을/를) 열심히 공부하고 있습니다.`);
    }

    study2() {
        const iga = this.josa(this.name, '이가');
        const eulreul = this.josa(this.major, '을를');

        console.log(
            `${this.name}${iga} 전공인 ${this.major}${eulreul} 열심히 공부하고 있습니다.`
        );
    }
}

const student1 = new Student("아이유", 22, "여성", "12341234", "음악");
student1.greet();
student1.study();

const student2 = new Student("홍길동", 22, "여성", "12341234", "국어");
student2.study2();
