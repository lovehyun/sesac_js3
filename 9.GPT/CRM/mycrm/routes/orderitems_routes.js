const express = require("express");
const controller = require("../controllers/orderitems_controller");

const router = express.Router();

// GET /api/order_items?page=1&size=20
router.get("/order_items", controller.list_order_items);

// Backward compatibility (if someone bookmarks old path)
router.get("/orderitems", controller.list_order_items);

module.exports = router;
