class Stack {
    constructor() {
        this.stack = {}; // 스택을 저장할 공간
        this.count = 0; // 스택 현재 크기
    }

    push(element) {
        this.stack[this.count] = element;
        this.count++;
    }

    pop() {
        if (this.count == 0) {
            return "더 가져갈게 없소..."
        }

        this.count--;
        const result = this.stack[this.count];
        // 메모리 leak 이 발생하는 이유?? 달라는거 줬고, 카운트는 낮췄으나, 실제로 지우지 않았음..
        // delete this.stack[this.count];
        return result;
    }

    size() {
        return this.count;
    }
}

const myStack = new Stack();
console.log(myStack.size());

myStack.push("초록색");
myStack.push("노란색");
myStack.push("주황색");
myStack.push("빨간색");

console.log(myStack.size());
console.log(myStack.pop());
console.log(myStack.pop());
console.log(myStack.pop());
console.log(myStack.pop());
console.log(myStack.pop());
console.log(myStack.pop());
console.log(myStack.pop());
