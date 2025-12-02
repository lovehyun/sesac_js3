const fs = require('fs');
const path = require('path');

const basePath = './';

fs.readdir(basePath, (err, files) => {
    if (err) {
        console.log('아몰라 오류났데. 일단 끝.');
        return;
    }

    // console.log('성공결과: ', files);
    files.forEach(file => {
        const filePath = path.join(basePath, file);
        // console.log('파일: ', filePath);
        checkFile(filePath);
    })
});

function checkFile(filePath) {
    fs.stat(filePath, (err, stats) => {
        if (err) {
            console.log('stat 정보 가져오기 실패');
            return;
        }

        if (stats.isFile()) {
            console.log('이것은 파일입니다: ', filePath);
        } else if (stats.isDirectory()) {
            console.log('이것은 디렉토리입니다: ', filePath);
        } else {
            console.lg('이건 뭔지 모르겠습니다.');
        }
    })
}