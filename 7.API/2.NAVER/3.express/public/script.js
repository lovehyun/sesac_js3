const searchForm = document.getElementById('searchForm');

searchForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    search();
});

async function search() {
    const query = document.getElementById('query');
    const queryStr = query.value.trim();

    if (!queryStr) return;

    // 요청 및 결과 처리
    const results = document.getElementById('results');
    results.innerHTML = '<li>로딩중...</li>';

    // try - catch 나중에 넣을 부분
    const resp = await fetch(`/api/search?query=${encodeURIComponent(queryStr)}&page=${currentPage}&display=${NUM_OF_ITEMS_PER_PAGE}`);
    const data = await resp.json();

    renderResults(data);
    renderPagination(data.total);
}

function renderResults(data) {
    results.innerHTML = '';
    results.innerHTML = `<h4>검색결과수: ${data.total}</h4>`;

    if (data.items && data.items.length > 0) {
        data.items.forEach((item) => {
            console.log(item);
            const li = document.createElement('li');
            // li.innerText = `
            li.innerHTML = `
                <h3><a href="${item.link}" target="_blank">${item.title}</h3></a>
                <p>${item.description}</p>
                <small>포스팅 일자: ${item.postdate}</small>
            `;
            results.appendChild(li);
        })
    }
}

const NUM_OF_ITEMS_PER_PAGE = 10;
const MAX_PAGE_NUM = 10;

let currentPage = 1;

function renderPagination(total) {
    const totalPages = Math.min(MAX_PAGE_NUM, Math.ceil(total / NUM_OF_ITEMS_PER_PAGE));

    const paginationDiv = document.getElementById('pagination');
    
    paginationDiv.innerHTML = ''; // 일단 지우고 다시 만들기

    paginationDiv.appendChild(createButton("<<", 1, currentPage === 1));
    paginationDiv.appendChild(createButton("<", currentPage - 1, currentPage === 1));

    for (let p = 1; p <= totalPages; p++) {
        paginationDiv.appendChild(createButton(p, p, false));
    }

    paginationDiv.appendChild(createButton(">", currentPage + 1, currentPage === totalPages));
    paginationDiv.appendChild(createButton(">>", totalPages, currentPage === totalPages));
}

function createButton(label, page, disabled) {
    const btn = document.createElement('button');
    btn.textContent = label;
    btn.disabled = disabled;

    if (page === currentPage) {
        btn.style.fontWeight = 'bold';
    }

    btn.addEventListener('click', () => {
        currentPage = page;
        search();
    });

    return btn;
}
