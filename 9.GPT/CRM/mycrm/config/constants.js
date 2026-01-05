// 공통 상수 (백엔드)
const PORT = 3000;

// 리스트 페이지네이션: 한 페이지에 보여줄 "행(레코드)" 수
const DEFAULT_PAGE_SIZE = 20;
const MAX_PAGE_SIZE = 200;

// 상세(사용자 주문 목록 등): 한 페이지에 보여줄 행 수
const DEFAULT_DETAIL_PAGE_SIZE = 10;

module.exports = {
  PORT,
  DEFAULT_PAGE_SIZE,
  MAX_PAGE_SIZE,
  DEFAULT_DETAIL_PAGE_SIZE,
};
