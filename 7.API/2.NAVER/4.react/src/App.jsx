import { useState } from 'react';
import { fetchNaverBlogSearch } from './api/naverBlogApi';
import SearchBar from './components/SearchBar.jsx';
import SearchResults from './components/SearchResults.jsx';

function App() {
    const [query, setQuery] = useState(''); // 검색어 저장할 상태 변수
    const [results, setResults] = useState([]); // 검색 결과 저장

    const handleSearch = async (nextQuery) => {
        console.log(nextQuery);
        setQuery(nextQuery);

        try {
            const data = await fetchNaverBlogSearch({query: nextQuery});

            setResults(data.items);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <h1>마이 블로그 검색</h1>
            {/* 입력창 */}
            <SearchBar onSearch={handleSearch} />
            {/* 결과창 */}
            <SearchResults results={results} />
        </div>
    );
}

export default App;
