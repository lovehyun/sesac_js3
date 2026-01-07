// 부모 - 자식 간에 데이터를 주고받는 두번째 패턴
// 상태관리를 자식이 하는 경우

import Child from './Child';

function Parent() {
    const handleMessage = (data) => {
        console.log('자식에게 받은 값: ', data);
    }

    return (
        <div>
            <h2>부모</h2>
            <Child sendMessageToParent={handleMessage} />
        </div>
    )
}

export default Parent;
