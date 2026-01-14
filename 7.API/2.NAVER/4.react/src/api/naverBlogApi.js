// const BASE_URL = 'http://127.0.0.1:3000/api'

export async function fetchNaverBlogSearch({
    query,
    page = 1,
    display = 10
}) {
    console.log(query);
    const url = 
        // `${BASE_URL}/search?query=${encodeURIComponent(query)}` +
        `/api/search?query=${encodeURIComponent(query)}` +
        `&page=${page}`+
        `&display=${display}`;

    const res = await fetch(url);
    return res.json();
}
