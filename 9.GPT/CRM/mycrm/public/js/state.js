const AppState = {
  table: "users",
  page: 1,
  size: DEFAULT_PAGE_SIZE,
};

function setTable(table) {
  AppState.table = table;
  AppState.page = 1;
}

function setPage(page) {
  AppState.page = page;
}

function setSize(size) {
  AppState.size = size;
  AppState.page = 1;
}
