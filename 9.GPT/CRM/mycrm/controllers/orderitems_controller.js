const { listTable } = require("../utils/list_controller");

async function list_orderitems(req, res, next) {
  try {
    await listTable(req, res, "orderitems", "Id");
  } catch (err) {
    next(err);
  }
}

module.exports = { list_orderitems };
