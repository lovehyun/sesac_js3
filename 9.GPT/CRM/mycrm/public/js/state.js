const AppState = {
  table: "dashboard",
  page: 1,
  size: 20,
};

function setTable(table) {
  AppState.table = table;
  AppState.page = 1; // 테이블 바꾸면 1페이지로
}

function setPage(page) {
  AppState.page = page;
}

function setSize(size) {
  AppState.size = size;
  AppState.page = 1;
}
