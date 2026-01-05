const express = require("express");
const controller = require("../controllers/items_controller");

const router = express.Router();

router.get("/items", controller.list_items);
router.get("/items/:id", controller.get_item);
router.get("/items/:id/monthly_sales", controller.item_monthly_sales);

module.exports = router;
