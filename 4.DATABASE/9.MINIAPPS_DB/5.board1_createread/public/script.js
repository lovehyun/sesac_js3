// 1. 이 파일 즉 이 페이지가 최초로 불릴때, 게시판에 글이 있을수도 있으니 로딩하기
document.addEventListener('DOMContentLoaded', () => {
    fetch('/api/list')
       .then(res => res.json())
       .then(data => {
            console.log(data); // 아마도 []
            data.forEach(post => makeCard(post.id, post.title, post.message));
       });
})

function makeCard(id, title, message) {
    // DOM 위치 가져오기
    // DOM 생성하기
    // 기존에 있던 DOM의 차일드에 추가하기

    const card = document.createElement('div');
    card.innerHTML = `
        <div class="card" id="card_${id}">
            <div class="card-body">
                <p class="card-id">${id}</p>
                <p class="card-title">${title}</p>
                <p class="card-text">${message}</p>
                <button class="btn btn-info" onclick="modifyPost(${id})">수정</button>
                <button class="btn btn-warning" onclick="deletePost(${id})">삭제</button>
            </div>
        </div>
    `
    document.getElementById('card-list').appendChild(card);
}

function uploadPost() { // 프런트에서 부른건 uploadPost() 였음
    // DOM 에서 입력한 글자들 가져오기...
    // fetch(글쓰기)
    //    .then(성공확인)
    //    .then(불러오기(=카드만들기))

    const title = document.getElementById('input-title').value;
    const message = document.getElementById('input-text').value;

    fetch('/api/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, message })
    }) 
        .then(res => res.json())
        .then(data => {
            if (data.result == 'success') {
                alert('저장 완료');
                location.reload(); // 이 페이지 통째로 새로 부르기
            } else {
                alert('저장 실패');
            }
        })
}

function deletePost(id) {
    // fetch(글삭제)
    //     .then(성공확인)
    //     .then(불러오기(=카드만들기))

    fetch(`/api/delete/${id}`, {
        method: 'DELETE',
    })
        .then(res => res.json())
        .then(data => {
            if (data.result == 'success') {
                alert('삭제 완료');
                location.reload(); // 이 페이지 통째로 새로 부르기
            } else {
                alert('삭제 실패');
            }
        })
}

function 수정함수() {
    // DOM 으로 수정할 위치 가져오기
    // 기존에 글 있던 곳을, 글을 입력하는곳의 DOM 으로 바꾸기
    // 저장을 누르면??
    //  fetch(글수정).then(성공확인).then(불러오기(=카드만들기))
}
