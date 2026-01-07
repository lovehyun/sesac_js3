import TextInput from './TextInput';

export default function LoginForm({ form, onChange, onSubmit }) {
    return (
        <form onSubmit={onSubmit} style={{ display: 'grid', gap: 10 }}>
            <TextInput label="아이디" name="id" value={form.id} onChange={onChange} />

            {/* 한줄이 너무 길어지면 아래처럼 쓰는 경우들도 매우 많음.. 단 일관성 있게 맞추는게 당연히 좋음 */}
            <TextInput 
                label="비밀번호" 
                name="pw" 
                type="password" 
                value={form.pw} 
                onChange={onChange} 
            />

            <button type="submit">로그인</button>
        </form>
    )
}
