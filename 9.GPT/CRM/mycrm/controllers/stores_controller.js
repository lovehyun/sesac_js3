const { all, get } = require("../database/db");

async function list_stores(req, res, next) {
  try {
    const page = Number.parseInt(req.query.page || "1", 10) || 1;
    const size = Number.parseInt(req.query.size || "20", 10) || 20;
    const offset = (page - 1) * size;

    const totalRow = await get("SELECT COUNT(*) AS cnt FROM stores");
    const total = totalRow?.cnt ?? 0;
    const totalPages = Math.max(1, Math.ceil(total / size));
    const safePage = Math.max(1, Math.min(page, totalPages));

    const rows = await all(
      `SELECT Id AS id, Type AS type, Name AS name, Address AS address
       FROM stores
       ORDER BY Name
       LIMIT ? OFFSET ?`,
      [size, offset]
    );

    res.json({
      data: rows,
      meta: { page: safePage, size, total, total_pages: totalPages },
    });
  } catch (err) {
    next(err);
  }
}

async function get_store(req, res, next) {
  try {
    const { id } = req.params;
    const store = await get("SELECT * FROM stores WHERE Id = ?", [id]);
    if (!store) return res.status(404).json({ message: "Store not found" });
    res.json({ data: store });
  } catch (err) {
    next(err);
  }
}

async function store_monthly_sales(req, res, next) {
  try {
    const { id } = req.params;
    const rows = await all(
      `SELECT
          strftime('%Y-%m', o.OrderAt) AS month,
          SUM(i.UnitPrice * COALESCE(oi.Qty, 1)) AS revenue,
          SUM(COALESCE(oi.Qty, 1)) AS count
       FROM orders o
       JOIN order_items oi ON oi.OrderId = o.Id
       JOIN items i ON i.Id = oi.ItemId
       WHERE o.StoreId = ?
       GROUP BY month
       ORDER BY month`,
      [id]
    );
    res.json({ data: rows });
  } catch (err) {
    next(err);
  }
}

async function store_top_customers(req, res, next) {
  try {
    const { id } = req.params;
    const rows = await all(
      `SELECT
          u.Id AS user_id,
          u.Name AS name,
          COUNT(*) AS frequency
       FROM orders o
       JOIN users u ON u.Id = o.UserId
       WHERE o.StoreId = ?
       GROUP BY o.UserId
       ORDER BY frequency DESC
       LIMIT 20`,
      [id]
    );
    res.json({ data: rows });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  list_stores,
  get_store,
  store_monthly_sales,
  store_top_customers,
};
