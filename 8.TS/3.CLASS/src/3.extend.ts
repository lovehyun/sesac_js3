// JS에서는 상속을 하나만 받음, TS에서는 두개이상 상속도 가능함.
interface BasicInfo {
    name: string;
    age: number;
}

interface ContactInfo {
    email: string;
    phone: string;
}

interface Employee extends BasicInfo, ContactInfo {
    employeeId: number;
}

const john: Employee = {
    name: "John",
    age: 25,
    email: "john@john.com",
    phone: "123-456-7890",
    employeeId: 1001
}

console.log(`John정보: ${john.name}, ${john.age}`);
