const { all, get } = require("../database/db");
const { listTable } = require("../utils/list_controller");
const { normalizeDetailPagination, buildMeta } = require("../utils/pagination_utils");

async function list_users(req, res, next) {
  try {
    await listTable(req, res, "users", "Name");
  } catch (err) {
    next(err);
  }
}

async function get_user(req, res, next) {
  try {
    const { id } = req.params;
    const user = await get("SELECT * FROM users WHERE Id = ?", [id]);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ data: user });
  } catch (err) {
    next(err);
  }
}

// 사용자 주문(주문 아이템) 목록: 10개 단위 페이지네이션
async function list_user_orderitems(req, res, next) {
  try {
    const { id } = req.params;
    const { page, size, offset } = normalizeDetailPagination(req.query);

    const totalRow = await get(
      `SELECT COUNT(*) AS cnt
       FROM order_items oi
       JOIN orders o ON o.Id = oi.OrderId
       WHERE o.UserId = ?`,
      [id]
    );
    const total = totalRow?.cnt ?? 0;

    const rows = await all(
      `SELECT 
          oi.Id AS order_item_id,
          o.Id AS order_id,
          o.OrderAt AS order_at,
          oi.ItemId AS item_id,
          i.Name AS item_name,
          i.UnitPrice AS unit_price,
          COALESCE(oi.Qty, 1) AS qty,
          (i.UnitPrice * COALESCE(oi.Qty, 1)) AS line_total,
          o.StoreId AS store_id
       FROM order_items oi
       JOIN orders o ON o.Id = oi.OrderId
       JOIN items i ON i.Id = oi.ItemId
       WHERE o.UserId = ?
       ORDER BY o.OrderAt DESC
       LIMIT ? OFFSET ?`,
      [id, size, offset]
    );

    res.json({ data: rows, meta: buildMeta(page, size, total) });
  } catch (err) {
    next(err);
  }
}

async function top_user_stores(req, res, next) {
  try {
    const { id } = req.params;
    const rows = await all(
      `SELECT 
          s.Name AS store_name,
          COUNT(*) AS visit_count
       FROM orders o
       JOIN stores s ON s.Id = o.StoreId
       WHERE o.UserId = ?
       GROUP BY o.StoreId
       ORDER BY visit_count DESC
       LIMIT 5`,
      [id]
    );
    res.json({ data: rows });
  } catch (err) {
    next(err);
  }
}

async function top_user_items(req, res, next) {
  try {
    const { id } = req.params;
    const rows = await all(
      `SELECT 
          i.Name AS item_name,
          SUM(COALESCE(oi.Qty, 1)) AS order_count
       FROM order_items oi
       JOIN orders o ON o.Id = oi.OrderId
       JOIN items i ON i.Id = oi.ItemId
       WHERE o.UserId = ?
       GROUP BY oi.ItemId
       ORDER BY order_count DESC
       LIMIT 5`,
      [id]
    );
    res.json({ data: rows });
  } catch (err) {
    next(err);
  }
}

// Kiosk용: 사용자 검색 (이름/ID 부분 일치)
// GET /api/users/search?q=...
async function search_users(req, res, next) {
  try {
    const q = String(req.query.q ?? "").trim();
    if (!q) return res.json({ data: [] });

    const like = `%${q}%`;
    const rows = await all(
      `SELECT Id, Name, Gender, Age
       FROM users
       WHERE Name LIKE ? OR Id LIKE ?
       ORDER BY Name
       LIMIT 20`,
      [like, like]
    );
    res.json({ data: rows });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  list_users,
  search_users,
  get_user,
  list_user_orderitems,
  top_user_stores,
  top_user_items,
};
