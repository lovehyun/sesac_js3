import { useState } from 'react';

function Child({ sendMessageToParent }) {
    const [text, setText] = useState('');

    return (
        <div>
            <h3>자식</h3>
            <input value={text} onChange={(e) => setText(e.target.value)} />
            <button onClick={() => sendMessageToParent(text)}>입력값전달</button>
        </div>
    )
}

export default Child;
