const express = require("express");

const usersRoutes = require("./users_routes");
const storesRoutes = require("./stores_routes");
const itemsRoutes = require("./items_routes");
const ordersRoutes = require("./orders_routes");
const orderitemsRoutes = require("./orderitems_routes");

const router = express.Router();

// 수동으로 연결 (요청하신 방식)
router.use(usersRoutes);
router.use(storesRoutes);
router.use(itemsRoutes);
router.use(ordersRoutes);
router.use(orderitemsRoutes);

// 헬스 체크
router.get("/health", (req, res) => {
  res.json({ ok: true });
});

module.exports = router;
