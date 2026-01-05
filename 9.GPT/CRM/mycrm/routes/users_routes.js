const express = require("express");
const controller = require("../controllers/users_controller");

const router = express.Router();

router.get("/users", controller.list_users);
router.get("/users/search", controller.search_users);
router.get("/users/:id", controller.get_user);

router.get("/users/:id/order_items", controller.list_user_orderitems);
router.get("/users/:id/top_stores", controller.top_user_stores);
router.get("/users/:id/top_items", controller.top_user_items);

module.exports = router;
