const express = require("express");
const controller = require("../controllers/orders_controller");

const router = express.Router();

router.get("/orders", controller.list_orders);
router.get("/orders/:id", controller.get_order);
router.get("/orders/:id/details", controller.order_details);

module.exports = router;
