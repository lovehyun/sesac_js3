const { DEFAULT_PAGE_SIZE, DEFAULT_DETAIL_PAGE_SIZE, MAX_PAGE_SIZE } = require("../config/constants");

function toInt(value, fallback) {
  const n = Number.parseInt(value, 10);
  return Number.isFinite(n) ? n : fallback;
}

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

function normalizePagination(query, defaultSize = DEFAULT_PAGE_SIZE) {
  const page = clamp(toInt(query.page, 1), 1, 1_000_000);
  const size = clamp(toInt(query.size, defaultSize), 1, MAX_PAGE_SIZE);
  const offset = (page - 1) * size;
  return { page, size, offset };
}

function normalizeDetailPagination(query) {
  return normalizePagination(query, DEFAULT_DETAIL_PAGE_SIZE);
}

function buildMeta(page, size, total) {
  const totalPages = Math.max(1, Math.ceil(total / size));
  const safePage = clamp(page, 1, totalPages);
  return { page: safePage, size, total, total_pages: totalPages };
}

module.exports = { normalizePagination, normalizeDetailPagination, buildMeta };
