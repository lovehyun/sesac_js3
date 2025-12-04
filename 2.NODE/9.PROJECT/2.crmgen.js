const names = [
  "서준",
  "민준",
  "도윤",
  "시우",
  "예준",
  "하준",
  "지호",
  "주원",
  "지후",
  "도현",
  "준우",
  "준서",
  "건우",
  "우진",
  "현우",
  "선우",
  "지훈",
  "유준",
  "은우",
  "연우",
  "서진",
  "이준",
  "시윤",
  "민재",
  "현준",
  "정우",
  "윤우",
  "수호",
  "지우",
  "승우",
  "유찬",
  "지환",
  "이안",
  "승현",
  "준혁",
  "시후",
  "진우",
  "승민",
  "민성",
  "수현",
  "지원",
  "준영",
  "시현",
  "재윤",
  "은호",
  "우주",
  "지한",
  "태윤",
  "한결",
  "지안",
  "시온",
  "서우",
  "윤호",
  "시원",
  "은찬",
  "민우",
  "재원",
  "동현",
  "이현",
  "하진",
  "민규",
  "우빈",
  "민찬",
  "재민",
  "율",
  "로운",
  "하율",
  "도하",
  "지율",
  "준호",
  "윤재",
  "준",
  "태민",
  "성민",
  "재현",
  "지민",
  "하민",
  "민호",
  "승준",
  "현서",
  "성현",
  "예성",
  "하람",
  "태오",
  "지성",
  "태현",
  "이든",
  "규민",
  "태양",
  "민혁",
  "다온",
  "성준",
  "윤성",
  "정민",
  "도훈",
  "주안",
  "은성",
  "예찬",
  "지오",
  "주호"
];

function generateName() {
    const index = Math.floor(Math.random() * names.length); // 0~3까지의 숫자
    // console.log(index);
    return names[index];
}

function generateGender() {
    const prob = Math.random();
    if (prob < 0.5) {
        return "남성";
    } else {
        return "여성";
    }
}

function generateGender2() {
    return Math.random() < 0.5 ? "남성" : "여성"
}

function generateBirthdate() {
    // const year = Math.floor(Math.random() * 100); // 0 ~ 99
    const year = Math.floor(Math.random() * 40) + 1980; // 1980 ~ 2019
    // const month = Math.floor(Math.random() * 12); // 0 ~ 11
    const month = Math.floor(Math.random() * 12) + 1; // 1 ~ 12
    // const day = Math.floor(Math.random() * 30); // 0 ~ 29
    const day = Math.floor(Math.random() * 28) + 1; // 1 ~ 28

    return `${year}-${month}-${day}`
}

console.log(generateName());
console.log(generateGender2());
console.log(generateBirthdate());
