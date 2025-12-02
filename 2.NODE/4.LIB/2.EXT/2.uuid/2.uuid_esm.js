// 신버전을 그냥 이용한다.
// 기존 rquire 문법을 모두다 import from 으로 변경한다.
// 그리고 우리의 package.json 에서 "type":"module" 을 추가한다.

// const { v4: uuidv4 } = require('uuid');

import { v4 as uuidv4 } from 'uuid';

const myid = uuidv4()
console.log('생성된 UUID: ', myid);
