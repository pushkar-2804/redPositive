const express = require("express");
const router = express.Router();

const {
  addData,
  updateData,
  getAllData,
  deleteData,
} = require("../controllers/DataController.js");
const { emailHandler } = require("../controllers/EmailController.js");

// CRUD Routes
router.post("/setdata", addData);
router.put("/updatedata", updateData);
router.get("/alldata", getAllData);
router.delete("/deletedata/:_id", deleteData);

// Email Route
router.post("/sendemail", emailHandler);

module.exports = router;
