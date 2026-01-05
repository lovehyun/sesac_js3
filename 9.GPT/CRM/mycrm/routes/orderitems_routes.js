const express = require("express");
const controller = require("../controllers/orderitems_controller");

const router = express.Router();

router.get("/orderitems", controller.list_orderitems);

module.exports = router;
