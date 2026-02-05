const express = require('express');
const axios = require('axios');
const { resolve } = require('path');

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 최종 배포 코드일때는 이런거 커밋하지 말고, dotenv로 대체할것. 아래는 코드에서 시험용으로 만든 고용키임.
const secretKey = 'test_gsk_docs_OaPz8L5KdmQXkzRz3y47BMw6';

app.post('/confirm', async (req, res) => {
    const { paymentKey, orderId, amount } = req.body;
    const encryptedSecretKey = 'Basic ' + Buffer.from(secretKey + ':').toString('base64');

    try {
        const response = await axios.post(
            'https://api.tosspayments.com/v1/payments/confirm',
            {
                orderId, amount, paymentKey,
            },
            {
                headers: {
                    Authorization: encryptedSecretKey,
                    'Content-Type': 'application/json',
                },
            },
        );

        // TODO: 결제 완료 비즈니스 로직을 구현하세요.
        console.log(response.data); // axios 에서는 결과가 data에 들어서 옴
        // 결제 성공후에, 나의 주문ID랑 가격이랑, 이런것들이 다 올바르게 진행됐는지 검증 및 DB저장 등...

        res.status(response.status).json(response.data); // 응답 주는코드와 body(즉 axios에서는 data)
    } catch (error) {
        // TODO: 결제 실패 비즈니스 로직을 구현하세요.
        if (error.response) {
            // got => axios 로 바뀌면서, 라이브러리의 객체 자료구조를 잘 이해해야함.
            res.status(error.response.status).json(error.response.data);
        } else {
            console.log(error);
            res.status(500).json({ message: '결제 승인 실패'});
        }
    }
});

app.get('/', (req, res) => {
    const path = resolve('./public/product.html');
    res.sendFile(path);
});

app.get('/checkout', (req, res) => {
    const path = resolve('./public/checkout.html');
    res.sendFile(path);
});

app.get('/success', (req, res) => {
    const path = resolve('./public/success.html');
    res.sendFile(path);
});

app.get('/fail', (req, res) => {
    const path = resolve('./public/fail.html');
    res.sendFile(path);
});

app.listen(port, () => {
    console.log(`http://localhost:${port} 으로 샘플 앱이 실행되었습니다.`);
});
