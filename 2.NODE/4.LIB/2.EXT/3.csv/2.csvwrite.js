const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const csvWriter = createCsvWriter({
    path: 'data2.csv',
    header: [
        {id: 'name', title: '이름'},
        {id: 'age', title: '나이'},
        {id: 'gender', title: '성별'},
        {id: 'birthdate', title: '생년월일'}
    ]
});
 
const records = [
    {name: '홍길동', age: 22, gender: "남", birthdate: "2000-01-01"},
    {name: '이길동', age: 32, gender: "남", birthdate: "2020-02-01"},
    {name: '김길동', age: 42, gender: "여", birthdate: "2030-03-01"},
    {name: '박길동', age: 52, gender: "남", birthdate: "2040-07-01"},
];
 
csvWriter.writeRecords(records)       // returns a promise
    .then(() => {
        console.log('...저장완료');
    });