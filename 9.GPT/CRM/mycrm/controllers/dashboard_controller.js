const { get } = require("../database/db");

async function buildSummary() {
  const users = await get("SELECT COUNT(*) AS cnt FROM users");
  const stores = await get("SELECT COUNT(*) AS cnt FROM stores");
  const items = await get("SELECT COUNT(*) AS cnt FROM items");
  const orders = await get("SELECT COUNT(*) AS cnt FROM orders");

  const revenue = await get(
    `SELECT COALESCE(SUM(i.UnitPrice), 0) AS total_revenue
     FROM order_items oi
     JOIN items i ON i.Id = oi.ItemId`
  );

  return {
    users: users?.cnt ?? 0,
    stores: stores?.cnt ?? 0,
    items: items?.cnt ?? 0,
    orders: orders?.cnt ?? 0,
    total_revenue: revenue?.total_revenue ?? 0,
  };
}

// /api/dashboard/summary (object 형태)
async function summary(req, res, next) {
  try {
    const s = await buildSummary();
    res.json({ data: s });
  } catch (err) {
    next(err);
  }
}

// /api/dashboard?page=&size= (list 형태) - 기존 apiList() 호환용
async function summaryList(req, res, next) {
  try {
    const s = await buildSummary();
    res.json({
      data: [s],
      meta: { total: 1, page: 1, size: 1, total_pages: 1 },
    });
  } catch (err) {
    next(err);
  }
}

module.exports = { summary, summaryList };
