const input = document.getElementById('input');
const sendBtn = document.getElementById('sendBtn');
const chatbox = document.getElementById('chatbot');

function add(role, text) {
    console.log(`Role: ${role}, Text: ${text}`);

    const bubble = document.createElement('div');
    bubble.className = `mb-2 d-flex ${role === 'user' ? 'justify-content-end' : 'justify-content-start'}`

    const badge = role === 'user' 
        ? `<span class="badge text-bg-primary me-2">나</span>`
        : `<span class="badge text-bg-warning me-2">봇</span>`;


    bubble.innerHTML = `${badge}<span>${text}</span>`;
    chatbox.appendChild(bubble);

    chatbox.scrollTop = chatbox.scrollHeight; // 자동으로 아래로 내리기
}

async function chat(message) {
    const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message })
    });
    const data = await res.json();
    // console.log(data);
    return data.reply;
}

async function send() {
    const text = input.value.trim();
    if (!text) return;

    add('user', text); // 내가 입력한 메시지 출력하기
    input.value = ''; // 입력글자 지우기

    try {
        const reply = await chat(text);
        add('bot', reply);  // 응답 메시지 출력하기
    } catch (err) {
        add('bot', err); // 화면에 오류 메시지 출력하기
    }
}

sendBtn.addEventListener('click', send);

input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        send();
    }
})