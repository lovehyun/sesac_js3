function Child({ sendMessageToParent }) {
    return (
        <div>
            <h3>자식</h3>
            <button onClick={() => sendMessageToParent('안녕하세요 부모님')}>부모에게메시지보내기</button>
        </div>
    )
}

export default Child;

// <button onClick={handler}>
// props = {
//     onClick: handler
// }

// props.onClick
//
// React가 해주는건...
// element.addEventListener('click', props.onClick);
