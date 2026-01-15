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
  html: `
    <div style="margin:0;padding:0;background:#f6f7fb;">
      <div style="max-width:620px;margin:0 auto;padding:24px;">
        
        <!-- 카드 -->
        <div style="
          background:#ffffff;
          border:1px solid #e9ecf3;
          border-radius:16px;
          overflow:hidden;
          box-shadow:0 8px 24px rgba(16,24,40,0.08);
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Noto Sans KR', Arial, sans-serif;
          color:#111827;
        ">

          <!-- 헤더(그라데이션) -->
          <div style="
            padding:22px 24px;
            background: linear-gradient(135deg, #16a34a 0%, #22c55e 50%, #86efac 100%);
            color:#ffffff;
          ">
            <div style="font-size:14px;opacity:0.9;letter-spacing:0.2px;">NODEMAILER • TEST MESSAGE</div>
            <div style="font-size:22px;font-weight:800;margin-top:6px;line-height:1.2;">
              테스트 이메일이 도착했습니다 ✅
            </div>
          </div>

          <!-- 본문 -->
          <div style="padding:24px;">
            <p style="margin:0 0 12px;font-size:16px;line-height:1.7;">
              안녕하세요! 이것은 <b>Node.js</b>로 발송한 첫 번째 이메일입니다.
            </p>

            <div style="
              margin:16px 0;
              padding:16px;
              border-radius:12px;
              background:#f0fdf4;
              border:1px solid #bbf7d0;
              color:#14532d;
              font-size:14px;
              line-height:1.7;
            ">
              <b>✅ 확인 포인트</b><br/>
              • 발신자(from): <span style="font-family:ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;">${process.env.NAVER_EMAIL || 'NAVER_EMAIL'}</span><br/>
              • 수신자(to): 나에게 발송 (테스트)<br/>
              • 형식: HTML 본문 + 카드 UI
            </div>

            <p style="margin:0 0 18px;font-size:14px;line-height:1.7;color:#374151;">
              아래 버튼은 테스트용입니다. (링크를 바꾸시면 실제 서비스 안내 버튼으로 활용 가능합니다.)
            </p>

            <!-- 버튼 -->
            <div style="text-align:center;margin:22px 0 10px;">
              <a href="https://example.com"
                 style="
                   display:inline-block;
                   padding:12px 18px;
                   background:#16a34a;
                   color:#ffffff;
                   text-decoration:none;
                   border-radius:10px;
                   font-weight:700;
                   font-size:14px;
                   box-shadow:0 8px 18px rgba(22,163,74,0.25);
                 ">
                테스트 링크 열기
              </a>
            </div>

            <hr style="border:none;border-top:1px solid #eef2f7;margin:22px 0;"/>

            <div style="font-size:12px;line-height:1.6;color:#6b7280;">
              이 메일은 자동 발송 테스트 메시지입니다.<br/>
              문제가 있다면 메일 설정(.env) 및 SMTP 설정을 확인해주세요.
            </div>
          </div>

          <!-- 푸터 -->
          <div style="
            padding:14px 24px;
            background:#fafafa;
            border-top:1px solid #eef2f7;
            font-size:12px;
            color:#6b7280;
            display:flex;
            justify-content:space-between;
            gap:12px;
            flex-wrap:wrap;
          ">
            <span>© ${new Date().getFullYear()} My Node Mailer</span>
            <span style="font-family:ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;">
              ${new Date().toISOString()}
            </span>
          </div>
        </div>

        <!-- 하단 여백 -->
        <div style="height:18px;"></div>
      </div>
    </div>
  `
};


transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.error(error);
    } else {
        console.log('이메일 전송 성공: ', info); // info.response
    }
});
