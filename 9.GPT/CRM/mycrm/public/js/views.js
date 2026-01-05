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

/* ===================== Dashboard (Kiosk Demo) ===================== */

function formatWon(n) {
  const num = Number(n ?? 0);
  if (!Number.isFinite(num)) return "0";
  return num.toLocaleString("ko-KR");
}

async function viewDashboard(state) {
  setText("page-title", "Dashboard");
  setText("breadcrumb", "Kiosk 주문 데모");

  const root = document.getElementById("view-root");
  const paginationEl = document.getElementById("pagination");
  const metaEl = document.getElementById("meta-line");
  if (paginationEl) paginationEl.innerHTML = "";
  metaEl.textContent = "-";

  // state 초기화 (요청: localStorage 사용하지 않고, 한 페이지에서 매장/사용자/주문을 모두 처리)
  state.kiosk = state.kiosk || {
    store: null, // { id,name,address,type }
    cart: {}, // itemId -> qty
    user: null,
    itemType: "ALL",
  };

  const kiosk = state.kiosk;

  // Kiosk 주문 화면 (한 페이지에서 매장 선택 + 사용자 선택 + 주문)
  root.innerHTML = `
    <div class="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-3">
      <div>
        <div class="fw-semibold">Kiosk 주문하기</div>
        <div class="text-muted small">매장/사용자 선택 후 주문을 생성합니다.</div>
      </div>
      <button class="btn btn-outline-secondary btn-sm" id="kiosk-reset">초기화</button>
    </div>

    <div class="row g-3">
      <div class="col-lg-8">
        <div class="card shadow-sm mb-3">
          <div class="card-body">
            <div class="fw-semibold mb-2">매장 선택</div>
            <div class="input-group mb-2">
              <input type="text" class="form-control" id="store-q" placeholder="매장 이름/주소 검색" />
              <button class="btn btn-dark" id="store-search">검색</button>
            </div>
            <div id="store-selected" class="small text-muted mb-2">선택된 매장이 없습니다.</div>
            <div class="list-group" id="store-results" style="max-height: 220px; overflow:auto;"></div>
          </div>
        </div>

        <div class="card shadow-sm mb-3">
          <div class="card-body">
            <div class="d-flex align-items-center justify-content-between flex-wrap gap-2">
              <div class="fw-semibold">메뉴</div>
              <div class="btn-group" role="group" aria-label="Item Type" id="type-filters"></div>
            </div>
          </div>
        </div>
        <div class="row g-3" id="items-grid"></div>
      </div>

      <div class="col-lg-4">
        <div class="card shadow-sm mb-3">
          <div class="card-body">
            <div class="fw-semibold mb-2">사용자 선택</div>
            <div class="input-group mb-2">
              <input type="text" class="form-control" id="user-q" placeholder="이름 또는 ID 검색" />
              <button class="btn btn-dark" id="user-search">검색</button>
            </div>
            <div id="user-selected" class="small text-muted mb-2">선택된 사용자가 없습니다.</div>
            <div class="list-group" id="user-results" style="max-height: 220px; overflow:auto;"></div>
          </div>
        </div>

        <div class="card shadow-sm">
          <div class="card-body">
            <div class="d-flex align-items-center justify-content-between">
              <div class="fw-semibold">장바구니</div>
              <button class="btn btn-outline-danger btn-sm" id="cart-clear">비우기</button>
            </div>
            <div class="mt-2" id="cart-lines"></div>
            <hr />
            <div class="d-flex align-items-center justify-content-between">
              <div class="text-muted">합계</div>
              <div class="fw-semibold"><span id="cart-total">0</span>원</div>
            </div>
            <button class="btn btn-success w-100 mt-3" id="place-order">주문하기</button>
            <div class="small text-muted mt-2" id="place-order-hint">사용자 선택 후 주문 가능합니다.</div>
          </div>
        </div>
      </div>
    </div>
  `;

  document.getElementById("kiosk-reset").addEventListener("click", () => {
    kiosk.cart = {};
    kiosk.user = null;
    kiosk.itemType = "ALL";
    kiosk.store = null;
    renderApp();
  });

  // items
  const itemsRes = await apiList("/items", 1, 2000);
  const items = itemsRes.data || [];
  const byId = Object.fromEntries(items.map(it => [it.Id, it]));

  // type filters
  const types = Array.from(new Set(items.map(it => it.Type))).sort();
  const typeButtons = ["ALL", ...types];
  const filtersEl = document.getElementById("type-filters");
  filtersEl.innerHTML = "";
  for (const t of typeButtons) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = `btn btn-sm ${kiosk.itemType === t ? "btn-dark" : "btn-outline-dark"}`;
    btn.textContent = t;
    btn.addEventListener("click", () => {
      kiosk.itemType = t;
      renderApp();
    });
    filtersEl.appendChild(btn);
  }

  function cartTotal() {
    let sum = 0;
    for (const [itemId, qty] of Object.entries(kiosk.cart)) {
      const it = byId[itemId];
      if (!it) continue;
      sum += Number(it.UnitPrice || 0) * Number(qty || 0);
    }
    return sum;
  }

  function renderCart() {
    const linesEl = document.getElementById("cart-lines");
    const totalEl = document.getElementById("cart-total");
    const hintEl = document.getElementById("place-order-hint");
    const placeBtn = document.getElementById("place-order");

    const entries = Object.entries(kiosk.cart)
      .map(([itemId, qty]) => ({ item: byId[itemId], qty }))
      .filter(x => x.item && Number(x.qty) > 0);

    if (entries.length === 0) {
      linesEl.innerHTML = `<div class="text-muted small">장바구니가 비어 있습니다.</div>`;
    } else {
      const ul = document.createElement("ul");
      ul.className = "list-group list-group-flush";
      for (const { item, qty } of entries) {
        const li = document.createElement("li");
        li.className = "list-group-item px-0";
        li.innerHTML = `
          <div class="d-flex justify-content-between align-items-start gap-2">
            <div>
              <div class="fw-semibold">${escapeHtml(item.Name)}</div>
              <div class="text-muted small">${escapeHtml(item.Type)} · ${formatWon(item.UnitPrice)}원</div>
            </div>
            <div class="text-end">
              <div class="fw-semibold">x ${qty}</div>
              <div class="text-muted small">${formatWon(Number(item.UnitPrice) * Number(qty))}원</div>
            </div>
          </div>
        `;
        ul.appendChild(li);
      }
      linesEl.innerHTML = "";
      linesEl.appendChild(ul);
    }

    totalEl.textContent = formatWon(cartTotal());

    const canOrder = !!kiosk.store && !!kiosk.user && Object.keys(kiosk.cart).length > 0;
    placeBtn.disabled = !canOrder;
    hintEl.textContent = canOrder ? "" : "매장 선택 + 사용자 선택 + 장바구니 담기 후 주문 가능합니다.";
  }

  // items grid
  const grid = document.getElementById("items-grid");
  grid.innerHTML = "";

  const filtered = kiosk.itemType === "ALL" ? items : items.filter(it => it.Type === kiosk.itemType);
  if (filtered.length === 0) {
    grid.innerHTML = `<div class="text-muted">상품이 없습니다.</div>`;
  }

  for (const it of filtered) {
    const col = document.createElement("div");
    col.className = "col-12 col-md-6 col-xl-4";
    const qty = Number(kiosk.cart[it.Id] || 0);

    col.innerHTML = `
      <div class="card h-100 shadow-sm">
        <div class="card-body">
          <div class="d-flex justify-content-between align-items-start">
            <div>
              <div class="fw-semibold">${escapeHtml(it.Name)}</div>
              <div class="text-muted small">${escapeHtml(it.Type)}</div>
            </div>
            <span class="badge text-bg-success">${formatWon(it.UnitPrice)}원</span>
          </div>
        </div>
        <div class="card-footer bg-white border-0 pt-0">
          <div class="d-flex align-items-center justify-content-between gap-2">
            <div class="btn-group" role="group" aria-label="qty">
              <button class="btn btn-outline-dark btn-sm" data-act="minus">-</button>
              <button class="btn btn-outline-dark btn-sm disabled" tabindex="-1">${qty}</button>
              <button class="btn btn-outline-dark btn-sm" data-act="plus">+</button>
            </div>
            <button class="btn btn-dark btn-sm" data-act="add">담기</button>
          </div>
        </div>
      </div>
    `;

    col.querySelector('[data-act="minus"]').addEventListener("click", () => {
      const next = Math.max(0, Number(kiosk.cart[it.Id] || 0) - 1);
      if (next === 0) delete kiosk.cart[it.Id];
      else kiosk.cart[it.Id] = next;
      renderApp();
    });
    col.querySelector('[data-act="plus"]').addEventListener("click", () => {
      const next = Math.min(99, Number(kiosk.cart[it.Id] || 0) + 1);
      kiosk.cart[it.Id] = next;
      renderApp();
    });
    col.querySelector('[data-act="add"]').addEventListener("click", () => {
      const next = Math.min(99, Number(kiosk.cart[it.Id] || 0) + 1);
      kiosk.cart[it.Id] = next;
      renderApp();
    });

    grid.appendChild(col);
  }

  // user search
  const userSelectedEl = document.getElementById("user-selected");
  const resultsEl = document.getElementById("user-results");
  const qEl = document.getElementById("user-q");
  const searchBtn = document.getElementById("user-search");

  function renderSelectedUser() {
    if (!kiosk.user) {
      userSelectedEl.innerHTML = `선택된 사용자가 없습니다.`;
      return;
    }
    userSelectedEl.innerHTML = `선택: <span class="fw-semibold">${escapeHtml(kiosk.user.Name)}</span> <span class="text-muted">(${escapeHtml(kiosk.user.Id)})</span>
      <a href="#" id="user-clear" class="ms-2 text-decoration-none">(해제)</a>`;
    userSelectedEl.querySelector("#user-clear").addEventListener("click", (e) => {
      e.preventDefault();
      kiosk.user = null;
      renderApp();
    });
  }

  async function doSearch() {
    const q = String(qEl.value || "").trim();
    if (!q) {
      resultsEl.innerHTML = `<div class="text-muted small">검색어를 입력해주세요.</div>`;
      return;
    }
    const res = await apiGetJson("/api/users/search", { q });
    const rows = res.data || [];

    resultsEl.innerHTML = "";
    if (rows.length === 0) {
      resultsEl.innerHTML = `<div class="text-muted small">검색 결과가 없습니다.</div>`;
      return;
    }

    for (const u of rows) {
      const a = document.createElement("a");
      a.href = "#";
      a.className = "list-group-item list-group-item-action";
      a.innerHTML = `<div class="d-flex justify-content-between">
        <div class="fw-semibold">${escapeHtml(u.Name)}</div>
        <div class="text-muted small">${escapeHtml(u.Id)}</div>
      </div>
      <div class="text-muted small">${escapeHtml(u.Gender ?? "")} · ${escapeHtml(u.Age ?? "")}</div>`;
      a.addEventListener("click", (e) => {
        e.preventDefault();
        kiosk.user = u;
        renderApp();
      });
      resultsEl.appendChild(a);
    }
  }

  searchBtn.addEventListener("click", doSearch);
  qEl.addEventListener("keydown", (e) => {
    if (e.key === "Enter") doSearch();
  });

  // store search (one-page)
  const storeSelectedEl = document.getElementById("store-selected");
  const storeResultsEl = document.getElementById("store-results");
  const storeQEl = document.getElementById("store-q");
  const storeSearchBtn = document.getElementById("store-search");

  // stores는 페이지 첫 로딩에서 한번 가져오고, 클라이언트에서 필터링합니다 (데모용 간단화)
  const storesRes = await apiList("/stores", 1, 2000);
  const stores = storesRes.data || [];

  function renderSelectedStore() {
    if (!kiosk.store) {
      storeSelectedEl.innerHTML = `선택된 매장이 없습니다.`;
      return;
    }
    storeSelectedEl.innerHTML = `선택: <span class="fw-semibold">${escapeHtml(kiosk.store.name)}</span>
      <span class="text-muted">(${escapeHtml(kiosk.store.type)} · ${escapeHtml(kiosk.store.address)})</span>
      <a href="#" id="store-clear" class="ms-2 text-decoration-none">(해제)</a>`;
    storeSelectedEl.querySelector("#store-clear").addEventListener("click", (e) => {
      e.preventDefault();
      kiosk.store = null;
      renderApp();
    });
  }

  function doStoreSearch() {
    const q = String(storeQEl.value || "").trim().toLowerCase();
    storeResultsEl.innerHTML = "";
    if (!q) {
      storeResultsEl.innerHTML = `<div class="text-muted small">검색어를 입력해주세요.</div>`;
      return;
    }
    const rows = stores.filter((s) => {
      const name = String(s.name || "").toLowerCase();
      const addr = String(s.address || "").toLowerCase();
      const type = String(s.type || "").toLowerCase();
      return name.includes(q) || addr.includes(q) || type.includes(q) || String(s.id || "").includes(q);
    });
    if (rows.length === 0) {
      storeResultsEl.innerHTML = `<div class="text-muted small">검색 결과가 없습니다.</div>`;
      return;
    }
    for (const s of rows.slice(0, 50)) {
      const a = document.createElement("a");
      a.href = "#";
      a.className = "list-group-item list-group-item-action";
      a.innerHTML = `<div class="d-flex justify-content-between">
        <div class="fw-semibold">${escapeHtml(s.name)}</div>
        <div class="text-muted small">${escapeHtml(s.id)}</div>
      </div>
      <div class="text-muted small">${escapeHtml(s.type)} · ${escapeHtml(s.address)}</div>`;
      a.addEventListener("click", (e) => {
        e.preventDefault();
        kiosk.store = s;
        renderApp();
      });
      storeResultsEl.appendChild(a);
    }
  }

  storeSearchBtn.addEventListener("click", doStoreSearch);
  storeQEl.addEventListener("keydown", (e) => {
    if (e.key === "Enter") doStoreSearch();
  });

  // cart actions
  document.getElementById("cart-clear").addEventListener("click", () => {
    kiosk.cart = {};
    renderApp();
  });

  // place order
  document.getElementById("place-order").addEventListener("click", async () => {
    const payload = {
      storeId: kiosk.store?.id,
      userId: kiosk.user?.Id,
      items: Object.entries(kiosk.cart).map(([itemId, qty]) => ({ itemId, qty })),
    };

    const res = await apiPostJson("/api/orders", payload);
    const orderId = res.data?.orderId;

    kiosk.cart = {};
    // 주문 후에는 사용자 유지 (데모 편의)

    root.insertAdjacentHTML(
      "afterbegin",
      `<div class="alert alert-success">
        주문이 생성되었습니다. OrderId: <a class="alert-link" href="#/orders/${encodeURIComponent(orderId)}">${escapeHtml(orderId)}</a>
      </div>`
    );

    renderCart();
  });

  renderSelectedUser();
  renderSelectedStore();
  renderCart();
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
    columns: ["Id", "OrderId", "ItemId", "Qty"],
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
    columns: ["order_item_id", "order_id", "order_at", "item_id", "item_name", "unit_price", "qty", "line_total", "store_id"],
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
    columns: ["id", "order_id", "item_id", "item_name", "qty", "unit_price", "line_total"],
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
