const { all, get } = require("../database/db");
const { listTable } = require("../utils/list_controller");

async function list_orders(req, res, next) {
  try {
    await listTable(req, res, "orders", "OrderAt");
  } catch (err) {
    next(err);
  }
}

async function get_order(req, res, next) {
  try {
    const { id } = req.params;
    const order = await get("SELECT * FROM orders WHERE Id = ?", [id]);
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json({ data: order });
  } catch (err) {
    next(err);
  }
}

// 주문 상세(해당 주문의 order_items + item_name)
async function order_details(req, res, next) {
  try {
    const { id } = req.params;
    const rows = await all(
      `SELECT
          oi.Id AS id,
          oi.OrderId AS order_id,
          oi.ItemId AS item_id,
          i.Name AS item_name
       FROM order_items oi
       JOIN items i ON i.Id = oi.ItemId
       WHERE oi.OrderId = ?
       ORDER BY oi.Id`,
      [id]
    );
    res.json({ data: rows });
  } catch (err) {
    next(err);
  }
}

module.exports = { list_orders, get_order, order_details };
