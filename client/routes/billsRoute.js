const express = require("express");
const {
  addBillsController,
  getBillsController,
  deleteBillController,
} = require("../controllers/billsController");

const router = express.Router();

// POST Method - Add bills
router.post("/add-bills", addBillsController);

// GET Method - Get bills
router.get("/get-bills", getBillsController);

module.exports = router;
