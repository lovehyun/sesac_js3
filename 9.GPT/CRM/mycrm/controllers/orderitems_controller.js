const { listTable } = require("./_list_controller_helper");

async function list_order_items(req, res, next) {
  try {
    await listTable(req, res, "order_items", "Id");
  } catch (err) {
    next(err);
  }
}

module.exports = {
  list_order_items,
};
