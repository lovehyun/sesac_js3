const express = require("express");
const { summary, summaryList } = require("../controllers/dashboard_controller");

const router = express.Router();

// list-style endpoint for apiList compatibility
router.get("/dashboard", summaryList);

// object-style endpoint used by dashboard renderer
router.get("/dashboard/summary", summary);

module.exports = router;
