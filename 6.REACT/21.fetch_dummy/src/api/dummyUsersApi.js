const USERS = [
    { id: 1, name: 'Alice', email: 'alice@example.com' },
    { id: 2, name: 'Bob', email: 'bob@example.com' },
    { id: 3, name: 'Charlie', email: 'charlie@example.com' },
];

// 실제로 가져오는것처럼 보여주려고 일부러 딜레이 추가
const API_DELAY_MS = 300;

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function fetchUsers() {
    await sleep(API_DELAY_MS);
    return USERS;
}

export async function fetchUserById(userId) {
    await sleep(API_DELAY_MS);
    const user = USERS.find((u) => u.id == userId) || null;
    // const user = USERS.find((u) => String(u.id) === String(userId)) || null;
    return user;
}