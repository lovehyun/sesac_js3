// 부모 - 자식 간에 데이터를 주고받는 가장 기본이 되는 패턴
// 상태관리를 부모가 하는 *정석*

import { useState } from 'react';
import Child from './Child';

function Parent() {
    const [message, setMessage] = useState('');

    const handleMessage = (data) => {
        setMessage(data);
    }

    return (
        <div>
            <h2>부모</h2>
            <p>자식에게서 받은 값: {message}</p>
            <Child sendMessageToParent={handleMessage} />
        </div>
    )
}

export default Parent;
