const { all, get } = require("../database/db");
const { normalizePagination, buildMeta } = require("../utils/pagination_utils");

/**
 * 테이블 리스트 조회(페이지네이션)
 * - 정렬/검색 등은 MVP 이후 확장용
 */
async function listTable(req, res, tableName, orderBy = "Id") {
  const { page, size, offset } = normalizePagination(req.query);

  // total
  const totalRow = await get(`SELECT COUNT(*) AS cnt FROM ${tableName}`);
  const total = totalRow?.cnt ?? 0;

  // data
  const rows = await all(
    `SELECT * FROM ${tableName} ORDER BY ${orderBy} LIMIT ? OFFSET ?`,
    [size, offset]
  );

  const meta = buildMeta(page, size, total);

  res.json({ data: rows, meta });
}

module.exports = { listTable };
