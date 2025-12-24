document.addEventListener('DOMContentLoaded', () => {
    // 검색 버튼 활성화
    const searchBtn = document.getElementById('search-button');
    const searchName = document.getElementById('search-name');

    searchBtn.addEventListener('click', () => {
        fetchUsers(searchName.value);
    })

    // 사용자를 가져올거야 
    fetchUsers('');
});

function fetchUsers(name) {
    const queryString = `?name=${encodeURIComponent(name)}&page=1`

    // 백엔드에 요청을 고민...
    fetch(`/api/users${queryString}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);

            // 테이블에 그려라
            renderTable(data.data);

            // 페이지네이션을 그려라
            renderPagination(data.totalPages);
        });
}

function renderPagination(totalPages) {
    const pagination = document.getElementById('pagination');

    let myPages = '<nav><ul class="pagination">';
    
    for (let i = 1; i <= totalPages; i++) {
        // pagination.innerHTML += `${i} `
        myPages += `<li class="page-item"><a class="page-link" href="#"> ${i} </a></li>`;
    }
    
    myPages += '</ul></nav>';
    console.log(myPages);
    pagination.innerHTML = myPages;
}

function renderTable(data) {
    // [{}] 데이터가 왕창 왔을꺼고.. 이걸 그리는걸 고민...
    const tableHeader = document.getElementById('table-header');
    const tableBody = document.getElementById('table-body');

    tableHeader.innerHTML = '';
    tableBody.innerHTML = '';

    if (data.length > 0) {
        // 1. 테이블의 헤더 생성
        // 첫번째 요소를 가져와서(data[0]) 그 안에 key를 뽑아내서,
        // tr/th를 만든다.
        const headers = Object.keys(data[0]);
        const headerRow = document.createElement('tr');
        headers.forEach(h => {
            // 원하는거 제거
            if (h != 'Address') {
                const one_th = document.createElement('th');
                one_th.textContent = h;
                headerRow.appendChild(one_th);
            }
        });

        // 만드걸 tableheader의 child로 append한다.
        tableHeader.appendChild(headerRow);

        // 2. 테이블의 바디 생성
        // 리스트만큼 돌면서 tr/td를 그리는것..
        data.forEach(row => {
            const bodyRow = document.createElement('tr');

            // 해당 row 에다가 이벤트
            bodyRow.addEventListener('click', () => {
                console.log('해당 줄 클릭됨');
                window.location = `/users/${row.Id}`  // 브라우저 창에 주소를 넣어서 이동하는 방법
            });
            
            for (const [key, value] of Object.entries(row)) {
                if (key != 'Address') {
                    const one_td = document.createElement('td');
                    one_td.textContent = value;
                    bodyRow.appendChild(one_td);
                }
            }

            // 만든걸 tablebody의 child로 append한다.
            tableBody.appendChild(bodyRow);
        });

    } else {
        tableBody.innerHTML = ' --- 표시할 데이터가 없습니다 --- ';
    }
}
