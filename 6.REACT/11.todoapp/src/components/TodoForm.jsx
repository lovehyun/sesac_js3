export default function TodoForm({ text, setText, onAdd }) {
    return (
        <form onSubmit={onAdd} style={{ display: 'flex', gap: 8, marginTop: 12 }}>
            <input 
                value={text}
                type="text" 
                placeholder="할 일을 입력하세요"
                onChange={(e) => setText(e.target.value)} />
            <button type="submit">추가</button>
        </form>
    )
}
