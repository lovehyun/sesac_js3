const AppState = {
  page: 1,
  size: DEFAULT_PAGE_SIZE,
  detail_page: 1,
};

async function renderApp() {
  const { route, id } = parseRoute();
  setActiveNav(route);

  const paginationEl = document.getElementById("pagination");
  if (paginationEl) paginationEl.innerHTML = "";

  try {
    if (route === "users" && id) return await viewUserDetail(id, AppState);
    if (route === "orders" && id) return await viewOrderDetail(id);
    if (route === "items" && id) return await viewItemDetail(id);
    if (route === "stores" && id) return await viewStoreDetail(id);

    if (route === "dashboard") return await viewDashboard(AppState);

    AppState.detail_page = 1;

    if (route === "users") return await viewUsersList(AppState);
    if (route === "orders") return await viewOrdersList(AppState);
    if (route === "orderitems") return await viewOrderItemsList(AppState);
    if (route === "items") return await viewItemsList(AppState);
    if (route === "stores") return await viewStoresList(AppState);

    window.location.hash = "#/users";
  } catch (err) {
    setText("page-title", "Error");
    setText("breadcrumb", "");
    setText("meta-line", "-");
    document.getElementById("view-root").innerHTML = `
      <div class="alert alert-danger mb-0">
        <div class="fw-semibold">화면 렌더링 실패</div>
        <div class="small mt-1">${String(err.message || err)}</div>
      </div>
    `;
  }
}

window.addEventListener("hashchange", () => renderApp());

document.addEventListener("DOMContentLoaded", () => {
  if (!window.location.hash) window.location.hash = "#/users";
  renderApp();
});
