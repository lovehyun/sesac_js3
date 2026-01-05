const { all, get, run, exec } = require("../database/db");
const { listTable } = require("../utils/list_controller");

function makeId(prefix) {
  // 교육용: 충돌 확률이 매우 낮은 간단 ID
  return `${prefix}${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`.toUpperCase();
}

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
          i.Name AS item_name,
          oi.Qty AS qty,
          i.UnitPrice AS unit_price,
          (oi.Qty * i.UnitPrice) AS line_total
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

// Kiosk 주문 생성 (orders + order_items)
// body: { storeId, userId, items: [{ itemId, qty }] }
async function create_order(req, res, next) {
  try {
    const { storeId, userId, items } = req.body || {};

    if (!storeId || !userId || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "Invalid payload. Required: storeId, userId, items[]" });
    }

    // 존재 여부 체크
    const store = await get("SELECT Id FROM stores WHERE Id = ?", [storeId]);
    const user = await get("SELECT Id FROM users WHERE Id = ?", [userId]);
    if (!store) return res.status(400).json({ message: "Store not found" });
    if (!user) return res.status(400).json({ message: "User not found" });

    const normalized = [];
    for (const it of items) {
      const itemId = it?.itemId;
      const qty = Number(it?.qty ?? 0);
      if (!itemId || !Number.isFinite(qty) || qty <= 0) continue;

      const itemRow = await get("SELECT Id FROM items WHERE Id = ?", [itemId]);
      if (!itemRow) return res.status(400).json({ message: `Item not found: ${itemId}` });

      normalized.push({ itemId, qty: Math.min(99, Math.floor(qty)) });
    }

    if (normalized.length === 0) {
      return res.status(400).json({ message: "No valid items" });
    }

    const orderId = makeId("O");
    const nowIso = new Date().toISOString();

    await exec("BEGIN TRANSACTION");
    try {
      await run(
        "INSERT INTO orders (Id, OrderAt, StoreId, UserId) VALUES (?, ?, ?, ?)",
        [orderId, nowIso, storeId, userId]
      );

      for (let i = 0; i < normalized.length; i++) {
        const oiId = makeId("OI");
        await run(
          "INSERT INTO order_items (Id, OrderId, ItemId, Qty) VALUES (?, ?, ?, ?)",
          [oiId, orderId, normalized[i].itemId, normalized[i].qty]
        );
      }

      await exec("COMMIT");
    } catch (e) {
      await exec("ROLLBACK");
      throw e;
    }

    res.status(201).json({ data: { orderId } });
  } catch (err) {
    next(err);
  }
}

module.exports = { list_orders, get_order, order_details, create_order };
