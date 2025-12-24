const userId = window.location.pathname.split('/').pop(); // 주소를 가져와서 / 로 짤라서 맨 뒤에꺼 반환

function fetchUserDetail() {
    fetch(`/api/users/${userId}`)
        .then(response => response.json())
        .then(data => {
            // console.log(data);
            renderTable(data);
        })
}

function renderTable(data) {
    const tableHeader = document.getElementById('table-header');
    const tableBody = document.getElementById('table-body');

    tableHeader.innerHTML = '';
    tableBody.innerHTML = '';

    const headers = Object.keys(data);
    const headerRow = document.createElement('tr');
    headers.forEach(h => {
        const one_th = document.createElement('th');
        one_th.textContent = h;
        headerRow.appendChild(one_th);
    });

    tableHeader.appendChild(headerRow);

    const bodyRow = document.createElement('tr');
    for (const [key, value] of Object.entries(data)) {
        const one_td = document.createElement('td');
        one_td.textContent = value;
        bodyRow.appendChild(one_td);
    }
    
    tableBody.appendChild(bodyRow);
}

fetchUserDetail();
