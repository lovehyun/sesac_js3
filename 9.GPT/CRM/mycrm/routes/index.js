const express = require("express");

const usersRoutes = require("./users_routes");
const ordersRoutes = require("./orders_routes");
const orderItemsRoutes = require("./order_items_routes");
const itemsRoutes = require("./items_routes");
const storesRoutes = require("./stores_routes");

const router = express.Router();

router.use(usersRoutes);
router.use(ordersRoutes);
router.use(orderItemsRoutes);
router.use(itemsRoutes);
router.use(storesRoutes);

router.get("/health", (req, res) => {
  res.json({ ok: true });
});

router.use((err, req, res, next) => {
  console.error("API Error:", err);
  res.status(500).json({ message: "Internal Server Error" });
});

module.exports = router;
