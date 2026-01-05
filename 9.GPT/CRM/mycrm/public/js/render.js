function escapeHtml(str) {
  return String(str ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function setText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}

function renderMeta(metaEl, meta) {
  if (!meta) { metaEl.textContent = "-"; return; }
  metaEl.textContent = `page ${meta.page} / ${meta.total_pages} · total ${meta.total} · size ${meta.size}`;
}

function renderTable(containerEl, rows, options = {}) {
  const {
    columns = null,
    headers = null,
    cellRenderers = null,
    emptyText = "데이터가 없습니다.",
  } = options;

  if (!rows || rows.length === 0) {
    containerEl.innerHTML = `<div class="text-muted">${escapeHtml(emptyText)}</div>`;
    return;
  }

  const cols = columns ?? Object.keys(rows[0]);

  const table = document.createElement("table");
  table.className = "table table-striped table-hover align-middle mb-0";

  const thead = document.createElement("thead");
  const trh = document.createElement("tr");
  for (const c of cols) {
    const th = document.createElement("th");
    th.scope = "col";
    th.textContent = headers?.[c] ?? c;
    trh.appendChild(th);
  }
  thead.appendChild(trh);

  const tbody = document.createElement("tbody");
  for (const row of rows) {
    const tr = document.createElement("tr");
    for (const c of cols) {
      const td = document.createElement("td");
      const v = row[c];

      const renderer = cellRenderers?.[c];
      if (typeof renderer === "function") {
        const rendered = renderer(v, row);
        if (rendered instanceof HTMLElement) td.appendChild(rendered);
        else td.innerHTML = escapeHtml(rendered);
      } else {
        td.textContent = v ?? "";
      }

      tr.appendChild(td);
    }
    tbody.appendChild(tr);
  }

  table.appendChild(thead);
  table.appendChild(tbody);

  containerEl.innerHTML = "";
  containerEl.appendChild(table);
}

function renderPagination(paginationEl, meta, onPageChange) {
  const page = meta?.page ?? 1;
  const totalPages = meta?.total_pages ?? 1;

  const setSize = typeof PAGE_SET_SIZE === "number" ? PAGE_SET_SIZE : 10;

  const makeItem = (label, targetPage, disabled, active) => {
    const li = document.createElement("li");
    li.className = `page-item${disabled ? " disabled" : ""}${active ? " active" : ""}`;

    const a = document.createElement("a");
    a.className = "page-link";
    a.href = "#";
    a.textContent = label;

    a.addEventListener("click", (e) => {
      e.preventDefault();
      if (disabled || active) return;
      onPageChange(targetPage);
    });

    li.appendChild(a);
    return li;
  };

  const currentSetIndex = Math.floor((page - 1) / setSize);
  const setStart = currentSetIndex * setSize + 1;
  const setEnd = Math.min(totalPages, setStart + setSize - 1);

  const prevSetPage = Math.max(1, setStart - setSize);
  const nextSetPage = Math.min(totalPages, setStart + setSize);

  paginationEl.innerHTML = "";

  // << >> : 한 셋(10페이지) 이동
  paginationEl.appendChild(makeItem("<<", prevSetPage, setStart === 1, false));

  // < > : 한 페이지 이동
  paginationEl.appendChild(makeItem("<", page - 1, page <= 1, false));

  for (let p = setStart; p <= setEnd; p++) {
    paginationEl.appendChild(makeItem(String(p), p, false, p === page));
  }

  paginationEl.appendChild(makeItem(">", page + 1, page >= totalPages, false));
  paginationEl.appendChild(makeItem(">>", nextSetPage, setEnd === totalPages, false));
}
