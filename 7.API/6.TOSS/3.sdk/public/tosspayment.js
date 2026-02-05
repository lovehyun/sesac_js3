const clientKey = "test_ck_xxxx"; // 각자의 key 입력할곳
const customerKey = "customer-123"; // 사용자 id + 고객구분 코드를 실제로 PG사의 가이드에 맞춰서..
const tossPayments = TossPayments(clientKey); // 토스 결제 앱
const payment = tossPayments.payment({ customerKey }) // 우리 사용자용 결제 초기화

let selectedProduct = null;
let selectedPaymentMethod = null;

function selectProduct(event, name, price) {
    selectedProduct = { name, price };
    document.querySelectorAll(".product-button").forEach(button => {
        button.style.backgroundColor = "white";
    });
    event.target.style.backgroundColor = "lightblue";
}

function selectPaymentMethod(method) {
    if (selectedPaymentMethod) {
        document.getElementById(selectedPaymentMethod).style.backgroundColor = "white";
    }
    selectedPaymentMethod = method;
    document.getElementById(selectedPaymentMethod).style.backgroundColor = "pink";
}

async function requestPayment() {
    if (!selectedProduct) {
        alert('상품을 선택해주세요');
        return;
    }
    if (!selectedPaymentMethod) {
        alert('결제 수단을 선택해주세요');
        return;
    }

    const { name, price } = selectedProduct;
    const orderId = generateRandomString(); // 랜덤 주문 번호 생성

    try {
        // 토스 결제창 띄우기
        await payment.requestPayment({
            method: selectedPaymentMethod,
            amount: { currency: "KRW", value: price },
            orderId: orderId,
            orderName: name,
            successUrl: `${window.location.origin}/success`,
            failUrl: `${window.location.origin}/fail`
        });
    } catch (error) {
        alert(`결제 요청 중 오류 발생: ${error.message}`)
    }
}

function generateRandomString() {
    return Math.random().toString(36).slice(2, 10); // 8자리 랜던 문자 만들기
}
