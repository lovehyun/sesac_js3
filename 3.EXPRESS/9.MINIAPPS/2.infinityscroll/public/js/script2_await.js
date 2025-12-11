// 시작시 초기값
const itemsPerLoad = 20;

let start = 0;
let end = start + itemsPerLoad;

async function getItemsFromTo() {
    const result = document.getElementById('result');

    const response = await fetch(`/api/items?start=${start}&end=${end}`);
    const data = await response.json();

    console.log(data);

    data.forEach(item => {
        // console.log(item);
        const itemElement = document.createElement('div');
        itemElement.classList.add('item'); // 디자인을 넣기 위해 클래스를 붙였음
        itemElement.textContent = item;
        result.appendChild(itemElement);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    // console.log('DOM ready');
    // 4. async/await로 변경하기
    getItemsFromTo(start, end);
});

window.addEventListener('scroll', () => {
    // console.log('스크롤 발생??', window.innerHeight, window.scrollY);
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        console.log('화면 끝 이동');

        start = end;
        end = end + itemsPerLoad;
        getItemsFromTo(start, end)
    }
});
