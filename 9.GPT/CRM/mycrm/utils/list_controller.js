const { all, get } = require("../database/db");
const { normalizePagination, buildMeta } = require("./pagination_utils");

async function listTable(req, res, tableName, orderBy = "Id") {
  const { page, size, offset } = normalizePagination(req.query);

  const totalRow = await get(`SELECT COUNT(*) AS cnt FROM ${tableName}`);
  const total = totalRow?.cnt ?? 0;

  const rows = await all(
    `SELECT * FROM ${tableName} ORDER BY ${orderBy} LIMIT ? OFFSET ?`,
    [size, offset]
  );

  const meta = buildMeta(page, size, total);
  res.json({ data: rows, meta });
}

module.exports = { listTable };
