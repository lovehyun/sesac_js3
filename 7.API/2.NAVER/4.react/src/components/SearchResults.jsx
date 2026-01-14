export default function SearchResults({
    results
}) {

    return (
      <ul>
        {results.map((item, index) => (
          <li key={index}>
            {/* XSS를 방지하기 위해서 tag들을 프로세싱 안하는게 기본임. 근데, 그 위험을 무릅쓰고 난 프로세싱 하겠다. */}
            <a href={item.link} target="_blank"><h5 dangerouslySetInnerHTML={{__html: item.title}}></h5></a>
            <p dangerouslySetInnerHTML={{__html: item.description}}></p>
            <small>{item.postdate}</small>
          </li>
        ))}
      </ul>
    )
};
