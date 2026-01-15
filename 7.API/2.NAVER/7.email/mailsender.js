require('dotenv').config({ quiet: true });
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'naver',
    host: 'smtp.naver.com',
    port: 465,
    auth: {
        user: process.env.NAVER_EMAIL,
        pass: process.env.NAVER_PASSWORD,
    },
});

const mailOptions = {
    from: process.env.NAVER_EMAIL,
    to: process.env.NAVER_EMAIL, // 일단 내가 나한테 보내고, 그 이후 원하는
    subject: '테스트 이메일',
    text: '안녕하세요, 이것은 나의 첫 노드로 발송하는 이메일입니다.'
}

transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.error(error);
    } else {
        console.log('이메일 전송 성공: ', info); // info.response
    }
});
