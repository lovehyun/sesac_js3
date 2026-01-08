export default function SearchInput({keyword, onChange}) {
    return (
        <input
            className="form-control mb-4" 
            value={keyword}
            placeholder="이름 검색"
            onChange={(e) => onChange(e.target.value)}
        />
    )
}
