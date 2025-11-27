function sum_to_number(max) {
    let sum = 0;
    // 1부터 100까지의 합을 구하시오..
    // 코드를 구현~~
    for (let i = 1; i <= max; i++) {
        sum = sum + i;
    }

    console.log(`1부터 ${max}까지의 합은: ${sum}`);
}

function sum_to_number_guess(max) {
    sum = (max * (max + 1)) / 2;

    console.log(`1부터 ${max}까지의 합은: ${sum}`);
}

console.time("sum-to-100");
sum_to_number(100);
console.timeEnd("sum-to-100");

console.time("sum-to-1000");
sum_to_number(1_000);
console.timeEnd("sum-to-1000");

// sum_to_number(10_000);
// sum_to_number(10_000_000);
console.time("sum-to-10억");
sum_to_number(1_000_000_000);  // 10억
// sum_to_number_guess(1_000_000_000);  // 10억
console.timeEnd("sum-to-10억");

console.time("sum-to-100억");
sum_to_number(10_000_000_000);  // 100억
// sum_to_number_guess(10_000_000_000);  // 100억
console.timeEnd("sum-to-100억");