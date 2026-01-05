const { randomUUID } = require("crypto");
const { get, all, run, withTransaction } = require("../database/db");

async function createKioskOrder(req, res, next) {
  try {
    const { user_id, store_id, items } = req.body || {};

    if (!user_id || !store_id || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "Invalid payload" });
    }

    const user = await get("SELECT Id FROM users WHERE Id = ?", [user_id]);
    if (!user) return res.status(400).json({ message: "Invalid user_id" });

    const store = await get("SELECT Id FROM stores WHERE Id = ?", [store_id]);
    if (!store) return res.status(400).json({ message: "Invalid store_id" });

    const normalized = [];
    for (const it of items) {
      const item_id = it?.item_id;
      const qty = Number.parseInt(it?.qty, 10);
      if (!item_id || !Number.isFinite(qty) || qty <= 0) continue;

      const exists = await get("SELECT Id FROM items WHERE Id = ?", [item_id]);
      if (!exists) return res.status(400).json({ message: `Invalid item_id: ${item_id}` });

      normalized.push({ item_id, qty });
    }
    if (normalized.length === 0) return res.status(400).json({ message: "No valid items" });

    const order_id = randomUUID();
    const order_at = new Date().toISOString().replace("T", " ").slice(0, 19);

    await withTransaction(async () => {
      await run(
        "INSERT INTO orders (Id, OrderAt, StoreId, UserId) VALUES (?, ?, ?, ?)",
        [order_id, order_at, store_id, user_id]
      );

      for (const it of normalized) {
        for (let k = 0; k < it.qty; k++) {
          await run(
            "INSERT INTO order_items (Id, OrderId, ItemId) VALUES (?, ?, ?)",
            [randomUUID(), order_id, it.item_id]
          );
        }
      }
    });

    const created = await get("SELECT * FROM orders WHERE Id = ?", [order_id]);
    const detail = await all(
      `SELECT oi.Id AS id, oi.OrderId AS order_id, oi.ItemId AS item_id,
              i.Name AS item_name, i.UnitPrice AS unit_price
       FROM order_items oi
       JOIN items i ON i.Id = oi.ItemId
       WHERE oi.OrderId = ?
       ORDER BY oi.Id`,
      [order_id]
    );

    res.status(201).json({ data: { order: created, items: detail } });
  } catch (err) {
    next(err);
  }
}

module.exports = { createKioskOrder };
