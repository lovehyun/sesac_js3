// 1. 이 파일 즉 이 페이지가 최초로 불릴때, 게시판에 글이 있을수도 있으니 로딩하기
document.addEventListener('DOMContentLoaded', () => {
    // fetch(게시판글)
    //    .then(카드만들기)
})

function 카드만들기(아이디, 타이틀, 내용) {
    // DOM 위치 가져오기
    // DOM 생성하기
    // 기존에 있던 DOM의 차일드에 추가하기
}

function 글쓰기함수() { // 프런트에서 부른건 uploadPost() 였음
    // DOM 에서 입력한 글자들 가져오기...
    // fetch(글쓰기)
    //    .then(성공확인)
    //    .then(불러오기(=카드만들기))
}

function 삭제함수() {
    // fetch(글삭제)
    //     .then(성공확인)
    //     .then(불러오기(=카드만들기))
}

function 수정함수() {
    // DOM 으로 수정할 위치 가져오기
    // 기존에 글 있던 곳을, 글을 입력하는곳의 DOM 으로 바꾸기
    // 저장을 누르면??
    //  fetch(글수정).then(성공확인).then(불러오기(=카드만들기))
}
