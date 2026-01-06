document.addEventListener('DOMContentLoaded', () => {
    // 현재 이 사용자의 로그인 상태 확인
    checkLoginStatus(); // 나의 상태를 *제대로* 알고 있는건?? 서버의 세션임... 그건 클라 알수 X

    document.getElementById('loginButton').addEventListener('click', login);
    document.getElementById('logoutButton').addEventListener('click', logout);
});

function checkLoginStatus() {
    fetch('/check-login')
        .then(resp => resp.json())
        .then(data => {
            console.log(data);
            if (data.username) {
                showProfile(data.username);
            } else {
                showLoginForm();
            }
        })
}

function logout(e) {
    fetch('/logout') // GET 방식인데, 받는 인자도 뭐도 아무것도 없음.. 그냥 요청하는 순간 끝.
        .then(resp => resp.json())
        .then(data => {
            console.log(data);
            // alert(data.message);
            if (data.message == '로그아웃 성공') {
                showLoginForm();
            }
        });
}

function login(e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    })
        .then(resp => resp.json()) // 서버에서 json으로 보냈을때만 이렇게 처리 가능
        .then(data => {
            // console.log(data);
            if (data.message == '로그인 성공') {
                // alert('로그인 성공');  // 1번 방법 - 결과 보여주기
                // window.location.href = '/profile'; // 2번 방법 - 페이지 이동하기
                showProfile(username);  // 3번 방법 - 로그인 정보 활용해서 페이지 랜더링하기
            } else {
                alert('로그인 실패');
            }
        });
}

function showProfile(username) {
    document.getElementById('loginFormContainer').style.display = 'none'; // id/pw창 숨기기
    document.getElementById('profile').style.display = 'block'; // 사용자 프로필 창 살리기(?)
    document.getElementById('usernameSpan').innerText = username;
}

function showLoginForm() {
    document.getElementById('profile').style.display = 'none';
    document.getElementById('loginFormContainer').style.display = 'block';
}