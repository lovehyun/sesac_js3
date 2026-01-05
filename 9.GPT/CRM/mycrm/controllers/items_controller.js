const { all, get } = require("../database/db");
const { listTable } = require("../utils/list_controller");

async function list_items(req, res, next) {
  try {
    await listTable(req, res, "items", "Name");
  } catch (err) {
    next(err);
  }
}

async function get_item(req, res, next) {
  try {
    const { id } = req.params;
    const item = await get("SELECT * FROM items WHERE Id = ?", [id]);
    if (!item) return res.status(404).json({ message: "Item not found" });
    res.json({ data: item });
  } catch (err) {
    next(err);
  }
}

async function item_monthly_sales(req, res, next) {
  try {
    const { id } = req.params;
    const rows = await all(
      `SELECT
          strftime('%Y-%m', o.OrderAt) AS month,
          SUM(i.UnitPrice * COALESCE(oi.Qty, 1)) AS total_revenue,
          SUM(COALESCE(oi.Qty, 1)) AS item_count
       FROM order_items oi
       JOIN orders o ON o.Id = oi.OrderId
       JOIN items i ON i.Id = oi.ItemId
       WHERE oi.ItemId = ?
       GROUP BY month
       ORDER BY month`,
      [id]
    );
    res.json({ data: rows });
  } catch (err) {
    next(err);
  }
}

module.exports = { list_items, get_item, item_monthly_sales };
