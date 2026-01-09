const BASE_URL = 'https://jsonplaceholder.typicode.com';

// signal 은 이 비동기 오퍼레이션을 중간에 중단할 수 있는 조건변수
async function requestJson(url) {
    const res = await fetch(url);

    if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
    }

    return res.json();
}

export async function fetchUsers() {
    return requestJson(`${BASE_URL}/users`);
}

export async function fetchUserById(userId) {
    return requestJson(`${BASE_URL}/users/${userId}`);
}

export async function deleteUserById(userId) {
    const res = await fetch(`${BASE_URL}/users/${userId}`, {
        method: 'DELETE',
    });

    if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
    }
}

export async function fetchPosts() {
    return requestJson(`${BASE_URL}/posts`);
}
