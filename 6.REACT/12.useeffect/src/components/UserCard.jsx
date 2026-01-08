export default function UserCard({ user, onRemove }) {
    return (
        <li 
            style={{
                border: '1px solid #ddd',
                borderRadius: 8,
                padding: 12,
                marginBottom: 12
            }}
        >
            {/* 조건부 랜더링 */}
            { onRemove && (
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
                    <h3 style={{ margin: 0}}>{user.name}</h3>
                    <button type="button" onClick={() => onRemove(user.id)}>삭제</button>
                </div>
            )}

            <p>이메일: {user.email}</p>
            <p>전화번호: {user.phone}</p>
            <p>회사: {user.company.name}</p>
            <p>주소: {user.address.city}, {user.address.street}</p>
        </li>
    )
}
