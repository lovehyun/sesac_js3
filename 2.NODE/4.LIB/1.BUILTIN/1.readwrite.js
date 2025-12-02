// 파일 입출력을 해야함...

// https://nodejs.org/docs/latest 에서 fs (또는 file system) 관련 내용을 찾는다

// 1.
const fs = require('fs');

// 2. 나 끝나면 내 안의 서브 2-a 를 호출해줘
// 콜백... 내가 너에게 일을 시켰으니, 다했으면 그때 나를 불러줘...
fs.readFile('example.txt', 'utf8', (err, data) => {
    // 2-a. 여기가 나중에 우리 os로부터 재 호출될 콜백 함수 - 언제 실행될지 나도 모름

    console.log('일단끝 - 결과가 성공/실패건 일단 끝났음.');
    if (err) {
        console.log('파일 읽기에 실패했습니다: ', err.message);
    } else {
        // console.log('(파일 읽기에 성공했습니다.) 라고 보통 말 안하고 결과를 줌.');
        console.log(data);
    }
});

// 3.
console.log("내가 더 먼저 끝남");

// 4.
// 파일 쓰기 - os야.. 니가 쓰고, 다 끝나면 나를 불러줘.
const content = "여기에는 내가 쓰고 싶은 내용을 작성합니다.";
fs.writeFile('example2.txt', content, 'utf8', (err) => {
    // 4-a. 여기가 나중에 우리 os로부터 재 호출될 콜백 함수 - 언제 실행될지 나도 모름

    if (err) {
        console.log('파일쓰기에 실패했습니다.');
    } else {
        console.log("파일 쓰기에 성공했습니다");
    }
});

// 5.
console.log("난 언제호출될까?");
