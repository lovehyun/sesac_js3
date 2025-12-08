const express = require('express');
const app = express();
const PORT = 3000;

// static 폴더 (스태틱 폴더, 정적 폴더 안에 있는 정적 파일, 여기에 img/css/js 같은 정적 파일들이 있으니, 필요한거 니가 알아서 가져가시오)
// 그럼 정적파일은?? 저것만 해당하나요?? 그럼 html은??

app.use(express.static('public'));

// 위치에 따라서, 라우트에 오기 전에 index.html 을 퍼블릭에서 가져가면?? 여기 도달하지 않음..
app.get('/', (req, res) => {
    res.send("그럼 나는요??");
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
