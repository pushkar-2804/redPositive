const express = require("express");
const router = express.Router();

const {
  addData,
  updateData,
  getAllData,
  deleteData,
} = require("../controllers/DataController.js");

router.post("/setdata", addData);
router.put("/updatedata", updateData);
router.get("/alldata", getAllData);
router.delete("/deletedata/:_id", deleteData);

module.exports = router;
