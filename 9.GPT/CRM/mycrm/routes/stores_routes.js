const express = require("express");
const controller = require("../controllers/stores_controller");

const router = express.Router();

router.get("/stores", controller.list_stores);
router.get("/stores/:id", controller.get_store);
router.get("/stores/:id/monthly_sales", controller.store_monthly_sales);
router.get("/stores/:id/top_customers", controller.store_top_customers);

module.exports = router;
