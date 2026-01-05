function linkTo(text, href, classes = "") {
  const a = document.createElement("a");
  a.href = href;
  a.className = classes;
  a.textContent = text;
  return a;
}

function badge(text) {
  const span = document.createElement("span");
  span.className = "badge text-bg-secondary code-badge";
  span.textContent = text;
  return span;
}

async function viewUsersList(state) {
  setText("page-title", "Users");
  setText("breadcrumb", "");

  const root = document.getElementById("view-root");
  const paginationEl = document.getElementById("pagination");
  const metaEl = document.getElementById("meta-line");

  root.innerHTML = `<div class="table-responsive" id="table-container"></div>`;
  const tableEl = document.getElementById("table-container");

  const result = await apiList("/users", state.page, state.size);
  renderMeta(metaEl, result.meta);

  renderTable(tableEl, result.data, {
    columns: ["Id", "Name", "Gender", "Age", "Birthdate", "Address"],
    cellRenderers: {
      Id: (v) => linkTo(v, `#/users/${encodeURIComponent(v)}`, "text-decoration-none"),
    },
  });

  renderPagination(paginationEl, result.meta, (p) => {
    state.page = p;
    renderApp();
  });
}

async function viewOrdersList(state) {
  setText("page-title", "Orders");
  setText("breadcrumb", "");

  const root = document.getElementById("view-root");
  const paginationEl = document.getElementById("pagination");
  const metaEl = document.getElementById("meta-line");

  root.innerHTML = `<div class="table-responsive" id="table-container"></div>`;
  const tableEl = document.getElementById("table-container");

  const result = await apiList("/orders", state.page, state.size);
  renderMeta(metaEl, result.meta);

  renderTable(tableEl, result.data, {
    columns: ["Id", "OrderAt", "StoreId", "UserId"],
    cellRenderers: {
      Id: (v) => linkTo(v, `#/orders/${encodeURIComponent(v)}`, "text-decoration-none"),
      StoreId: (v) => linkTo(v, `#/stores/${encodeURIComponent(v)}`, "text-decoration-none"),
      UserId: (v) => linkTo(v, `#/users/${encodeURIComponent(v)}`, "text-decoration-none"),
    },
  });

  renderPagination(paginationEl, result.meta, (p) => {
    state.page = p;
    renderApp();
  });
}

async function viewOrderItemsList(state) {
  setText("page-title", "OrderItems");
  setText("breadcrumb", "");

  const root = document.getElementById("view-root");
  const paginationEl = document.getElementById("pagination");
  const metaEl = document.getElementById("meta-line");

  root.innerHTML = `<div class="table-responsive" id="table-container"></div>`;
  const tableEl = document.getElementById("table-container");

  const result = await apiList("/order_items", state.page, state.size);
  renderMeta(metaEl, result.meta);

  renderTable(tableEl, result.data, {
    columns: ["Id", "OrderId", "ItemId"],
    cellRenderers: {
      // Id 클릭 불가
      OrderId: (v) => linkTo(v, `#/orders/${encodeURIComponent(v)}`, "text-decoration-none"),
      ItemId: (v) => linkTo(v, `#/items/${encodeURIComponent(v)}`, "text-decoration-none"),
    },
  });

  renderPagination(paginationEl, result.meta, (p) => {
    state.page = p;
    renderApp();
  });
}

async function viewItemsList(state) {
  setText("page-title", "Items");
  setText("breadcrumb", "");

  const root = document.getElementById("view-root");
  const paginationEl = document.getElementById("pagination");
  const metaEl = document.getElementById("meta-line");

  root.innerHTML = `<div class="table-responsive" id="table-container"></div>`;
  const tableEl = document.getElementById("table-container");

  const result = await apiList("/items", state.page, state.size);
  renderMeta(metaEl, result.meta);

  renderTable(tableEl, result.data, {
    columns: ["Id", "Name", "Type", "UnitPrice"],
    cellRenderers: {
      Id: (v) => linkTo(v, `#/items/${encodeURIComponent(v)}`, "text-decoration-none"),
    },
  });

  renderPagination(paginationEl, result.meta, (p) => {
    state.page = p;
    renderApp();
  });
}

async function viewStoresList(state) {
  setText("page-title", "Stores");
  setText("breadcrumb", "");

  const root = document.getElementById("view-root");
  const paginationEl = document.getElementById("pagination");
  const metaEl = document.getElementById("meta-line");

  root.innerHTML = `<div class="table-responsive" id="table-container"></div>`;
  const tableEl = document.getElementById("table-container");

  const result = await apiList("/stores", state.page, state.size);
  renderMeta(metaEl, result.meta);

  renderTable(tableEl, result.data, {
    columns: ["id", "type", "name", "address"],
    cellRenderers: {
      id: (v) => linkTo(v, `#/stores/${encodeURIComponent(v)}`, "text-decoration-none"),
    },
  });

  renderPagination(paginationEl, result.meta, (p) => {
    state.page = p;
    renderApp();
  });
}

/* ===================== Detail Pages ===================== */

async function viewUserDetail(userId, state) {
  setText("page-title", "User Detail");
  setText("breadcrumb", `> ${userId}`);

  const root = document.getElementById("view-root");
  const paginationEl = document.getElementById("pagination");
  const metaEl = document.getElementById("meta-line");

  root.innerHTML = `
    <div class="mb-4">
      <div class="table-responsive" id="user-table"></div>
    </div>

    <div class="mb-4">
      <h2 class="h6">주문한 상품(최근순)</h2>
      <div class="table-responsive" id="user-orders-table"></div>
      <div class="mt-2 text-muted small" id="user-orders-meta"></div>
    </div>

    <div class="row g-3">
      <div class="col-lg-6">
        <h2 class="h6">자주 방문한 매장 Top5</h2>
        <div class="table-responsive" id="top-stores-table"></div>
      </div>
      <div class="col-lg-6">
        <h2 class="h6">자주 주문한 상품 Top5</h2>
        <div class="table-responsive" id="top-items-table"></div>
      </div>
    </div>
  `;

  const [userRes, orderItemsRes, topStoresRes, topItemsRes] = await Promise.all([
    apiGetJson(`/api/users/${encodeURIComponent(userId)}`),
    apiGetJson(`/api/users/${encodeURIComponent(userId)}/order_items`, { page: state.detail_page, size: USER_DETAIL_ORDERITEMS_PAGE_SIZE }),
    apiGetJson(`/api/users/${encodeURIComponent(userId)}/top_stores`),
    apiGetJson(`/api/users/${encodeURIComponent(userId)}/top_items`),
  ]);

  renderTable(document.getElementById("user-table"), [userRes.data], {
    columns: ["Id", "Name", "Gender", "Age", "Birthdate", "Address"],
    cellRenderers: { Id: (v) => badge(v) }
  });

  const ordersTableEl = document.getElementById("user-orders-table");
  const ordersMetaEl = document.getElementById("user-orders-meta");

  renderTable(ordersTableEl, orderItemsRes.data, {
    columns: ["order_item_id", "order_id", "order_at", "item_id", "item_name", "unit_price", "store_id"],
    cellRenderers: {
      order_id: (v) => linkTo(v, `#/orders/${encodeURIComponent(v)}`, "text-decoration-none"),
      item_id: (v) => linkTo(v, `#/items/${encodeURIComponent(v)}`, "text-decoration-none"),
      store_id: (v) => linkTo(v, `#/stores/${encodeURIComponent(v)}`, "text-decoration-none"),
    },
    emptyText: "주문 데이터가 없습니다.",
  });

  ordersMetaEl.textContent = `page ${orderItemsRes.meta.page} / ${orderItemsRes.meta.total_pages} · total ${orderItemsRes.meta.total} · size ${orderItemsRes.meta.size}`;
  metaEl.textContent = "-";

  renderPagination(paginationEl, orderItemsRes.meta, (p) => {
    state.detail_page = p;
    renderApp();
  });

  renderTable(document.getElementById("top-stores-table"), topStoresRes.data, {
    columns: ["store_name", "visit_count"],
    headers: { store_name: "Store Name", visit_count: "Visit Count" },
    emptyText: "데이터가 없습니다.",
  });

  renderTable(document.getElementById("top-items-table"), topItemsRes.data, {
    columns: ["item_name", "order_count"],
    headers: { item_name: "Item Name", order_count: "Order Count" },
    emptyText: "데이터가 없습니다.",
  });
}

async function viewOrderDetail(orderId) {
  setText("page-title", "Order Detail");
  setText("breadcrumb", `> ${orderId}`);

  const root = document.getElementById("view-root");
  document.getElementById("pagination").innerHTML = "";
  document.getElementById("meta-line").textContent = "-";

  root.innerHTML = `
    <div class="mb-4">
      <h2 class="h6">Order</h2>
      <div class="table-responsive" id="order-table"></div>
    </div>
    <div>
      <h2 class="h6">Order Items</h2>
      <div class="table-responsive" id="orderitems-table"></div>
    </div>
  `;

  const [orderRes, detailsRes] = await Promise.all([
    apiGetJson(`/api/orders/${encodeURIComponent(orderId)}`),
    apiGetJson(`/api/orders/${encodeURIComponent(orderId)}/details`),
  ]);

  renderTable(document.getElementById("order-table"), [orderRes.data], {
    columns: ["Id", "OrderAt", "StoreId", "UserId"],
    cellRenderers: {
      Id: (v) => badge(v),
      StoreId: (v) => linkTo(v, `#/stores/${encodeURIComponent(v)}`, "text-decoration-none"),
      UserId: (v) => linkTo(v, `#/users/${encodeURIComponent(v)}`, "text-decoration-none"),
    }
  });

  renderTable(document.getElementById("orderitems-table"), detailsRes.data, {
    columns: ["id", "order_id", "item_id", "item_name"],
    cellRenderers: {
      order_id: (v) => linkTo(v, `#/orders/${encodeURIComponent(v)}`, "text-decoration-none"),
      item_id: (v) => linkTo(v, `#/items/${encodeURIComponent(v)}`, "text-decoration-none"),
    },
    emptyText: "주문 아이템이 없습니다.",
  });
}

let itemChart;

async function viewItemDetail(itemId) {
  setText("page-title", "Item Detail");
  setText("breadcrumb", `> ${itemId}`);

  const root = document.getElementById("view-root");
  document.getElementById("pagination").innerHTML = "";
  document.getElementById("meta-line").textContent = "-";

  root.innerHTML = `
    <div class="mb-4">
      <h2 class="h6">Item</h2>
      <div class="table-responsive" id="item-table"></div>
    </div>

    <div class="mb-3">
      <h2 class="h6">월간 매출액</h2>
      <div class="table-responsive" id="monthly-table"></div>
    </div>

    <div class="mt-3">
      <canvas id="monthly-chart"></canvas>
    </div>
  `;

  const [itemRes, monthlyRes] = await Promise.all([
    apiGetJson(`/api/items/${encodeURIComponent(itemId)}`),
    apiGetJson(`/api/items/${encodeURIComponent(itemId)}/monthly_sales`),
  ]);

  renderTable(document.getElementById("item-table"), [itemRes.data], {
    columns: ["Id", "Name", "Type", "UnitPrice"],
    cellRenderers: { Id: (v) => badge(v) }
  });

  const monthlyRows = monthlyRes.data.map(r => ({
    Month: r.month,
    "Total Revenue": r.total_revenue ?? 0,
    "Item Count": r.item_count ?? 0,
  }));

  renderTable(document.getElementById("monthly-table"), monthlyRows, {
    columns: ["Month", "Total Revenue", "Item Count"],
    emptyText: "월간 매출 데이터가 없습니다.",
  });

  const labels = monthlyRes.data.map(r => r.month);
  const revenues = monthlyRes.data.map(r => Number(r.total_revenue ?? 0));
  const counts = monthlyRes.data.map(r => Number(r.item_count ?? 0));

  const ctx = document.getElementById("monthly-chart");
  if (itemChart) itemChart.destroy();

  itemChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels,
      datasets: [
        { type: "bar", label: "Total Revenue", data: revenues, yAxisID: "y" },
        { type: "line", label: "Item Count", data: counts, yAxisID: "y1", tension: 0.2 },
      ],
    },
    options: {
      responsive: true,
      interaction: { mode: "index", intersect: false },
      scales: {
        y: { position: "left", title: { display: true, text: "Revenue" } },
        y1: { position: "right", grid: { drawOnChartArea: false }, title: { display: true, text: "Count" } },
      },
    },
  });
}

async function viewStoreDetail(storeId) {
  setText("page-title", "Store Detail");
  setText("breadcrumb", `> ${storeId}`);

  const root = document.getElementById("view-root");
  document.getElementById("pagination").innerHTML = "";
  document.getElementById("meta-line").textContent = "-";

  root.innerHTML = `
    <div class="mb-4">
      <h2 class="h6">매장 정보</h2>
      <div class="table-responsive" id="store-info-table"></div>
    </div>

    <div class="mb-4">
      <h2 class="h6">월간 매출액</h2>
      <div class="table-responsive" id="store-monthly-table"></div>
    </div>

    <div>
      <h2 class="h6">단골 고객</h2>
      <div class="table-responsive" id="store-customers-table"></div>
    </div>
  `;

  const [storeRes, monthlyRes, customersRes] = await Promise.all([
    apiGetJson(`/api/stores/${encodeURIComponent(storeId)}`),
    apiGetJson(`/api/stores/${encodeURIComponent(storeId)}/monthly_sales`),
    apiGetJson(`/api/stores/${encodeURIComponent(storeId)}/top_customers`),
  ]);

  const s = storeRes.data;
  renderTable(document.getElementById("store-info-table"), [{
    Name: s.Name,
    Type: s.Type,
    Address: s.Address,
  }], { columns: ["Name", "Type", "Address"], emptyText: "매장 정보가 없습니다." });

  const monthlyRows = monthlyRes.data.map(r => ({
    month: r.month,
    revenue: r.revenue ?? 0,
    count: r.count ?? 0,
  }));
  renderTable(document.getElementById("store-monthly-table"), monthlyRows, {
    columns: ["month", "revenue", "count"],
    emptyText: "월간 매출 데이터가 없습니다.",
  });

  renderTable(document.getElementById("store-customers-table"), customersRes.data, {
    columns: ["user_id", "name", "frequency"],
    cellRenderers: {
      user_id: (v) => linkTo(v, `#/users/${encodeURIComponent(v)}`, "text-decoration-none"),
    },
    emptyText: "단골 고객 데이터가 없습니다.",
  });
}
