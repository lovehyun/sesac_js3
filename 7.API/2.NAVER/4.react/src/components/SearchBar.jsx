import { useState } from 'react';

export default function SearchBar({ onSearch }) {
    const [inputValue, setInputValue] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(inputValue);
    }

    return (
      <form onSubmit={handleSubmit} >
        <input 
          type="text" 
          placeholder="검색어를 입력하세요" 
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="submit">검색</button>
      </form>
    )
}
