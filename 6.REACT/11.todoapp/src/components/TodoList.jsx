export default function TodoList({ todos, onToggle, onRemove }) {
    return (
        <ul style={{ marginTop: 12, paddingLeft: 16 }}>
            {todos.map((t) => (
                <li key={t.id} style={{ paddingBottom: 8 }}>
                    <label>
                        <input 
                            type="checkbox" 
                            checked={t.done} 
                            onChange={() => onToggle(t.id)} 
                        />
                        <span style={{ textDecoration: t.done ? 'line-through' : 'none' }}>
                            {t.text}
                        </span>
                    </label>

                    <button type="button" onClick={() => onRemove(t.id)} style={{ marginLeft: 'auto' }}>
                        삭제
                    </button>
                </li>
            ))}
        </ul>
    )
}
