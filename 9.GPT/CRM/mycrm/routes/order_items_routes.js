const express = require("express");
const controller = require("../controllers/order_items_controller");

const router = express.Router();

router.get("/order_items", controller.list_order_items);

module.exports = router;
