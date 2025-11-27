function gugudan(dan) {
    // 2단의 구구단을 출력하시오.
    console.log(`=== ${dan}단 ===`)
    for (let i = 2; i <= 9; i++) {
        console.log(`${dan} x ${i} = ${dan * i}`)
    }
}

gugudan(2);
gugudan(3);

for (let dan = 5; dan <= 7; dan++) {
    gugudan(dan);
}