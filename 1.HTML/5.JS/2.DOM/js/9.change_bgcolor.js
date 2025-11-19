function changeBGColor() {
    // console.log("배경색 바꾸기");
    // document.body.style.backgroundColor = "blue";
    if (document.body.style.backgroundColor == 'red') {
        document.body.style.backgroundColor = 'blue';
    } else {
        document.body.style.backgroundColor = 'red';
    }
}

function changeBGColor_cycle() {
    const colors = ["red", "blue", "green"];

    // 순환하기
    // console.log("색상목록:", colors)

    // 힌트1: 색상에 있는 항목들을 가져오려면?? 인덱싱
    // console.log(colors[0]);
    // console.log(colors[1]);
    // console.log(colors[2]);

    // if 구문으로 이걸 잘~~~~~ 처리
    if (document.body.style.backgroundColor == colors[0]) {
        document.body.style.backgroundColor = colors[1];
    } else if (document.body.style.backgroundColor == colors[1]) {
        document.body.style.backgroundColor = colors[2];
    } else if (document.body.style.backgroundColor == colors[2]) {
        document.body.style.backgroundColor = colors[0];
    } else {
        document.body.style.backgroundColor = colors[0];
    }

    // 이걸 어떻게 더 깔끔하고 이쁘게 만들까???
}

// 교육적인 목적으로 버저닝 때문에 1/2/3 붙이는것일뿐... 
// 회사가서는 이렇게 함수명 뒤에 숫자 절대 금지!!
let currentIndex = 0;
function changeBGColor_cycle2() {
    const colors = ["red", "blue", "green"];
    // 힌트: 인덱스를 증가하는 ++ 또는 += 이런것들을 배웠음..
    console.log("현재 인덱스: ", currentIndex);
    document.body.style.backgroundColor = colors[currentIndex];
    currentIndex += 1;
    if (currentIndex > 2) {
        currentIndex = 0;
    }
}

function changeBGColor_cycle3() {
    const colors = ["red", "blue", "green"];
    console.log("현재 인덱스: ", currentIndex);

    document.body.style.backgroundColor = colors[currentIndex++];
    if (currentIndex > 2) {
        currentIndex = 0;
    }
}

function changeBGColor_cycle4() { // 모듈러 연산을 사용해서 나머지 값을 구한다.
    const colors = ["red", "blue", "green", "purple", "orange"];
    console.log("현재 인덱스: ", currentIndex);

    document.body.style.backgroundColor = colors[currentIndex];
    currentIndex = (currentIndex + 1) % colors.length;  // 이렇게 해버리면??
}

// 무작위 숫자 만들기... => "랜덤" 이라고 부름
// 힌트: R G B 에 대해서 각각 무작위 숫자를 만든다.. (단, 범위가 0 ~ 255 까지에서...)
// rgba 배운거 말고.. #RRGGBB 이 포멧으로 바꾼다..
// 16진수로 변경해서 색상을 적용한다
// document.body.style.backgroundColor = '#FF0000' 이런식으로 빨강
// document.body.style.backgroundColor = '#00FF00' 이런식으로 초록
// document.body.style.backgroundColor = '#0000FF' 이런식으로 파랑
