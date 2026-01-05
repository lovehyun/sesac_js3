const express = require("express");
const { createKioskOrder } = require("../controllers/kiosk_controller");

const router = express.Router();
router.post("/kiosk/orders", createKioskOrder);

module.exports = router;
