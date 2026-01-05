const { listTable } = require("../utils/list_controller");

async function list_order_items(req, res, next) {
  try {
    await listTable(req, res, "order_items", "Id");
  } catch (err) {
    next(err);
  }
}

module.exports = { list_order_items };
