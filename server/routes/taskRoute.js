const express = require("express");
const router = express.Router();

const {
  addOrUpdateData,
  getAllData,
  deleteData,
} = require("../controllers/DataController.js");

router.post("/setdata", addOrUpdateData);
router.get("/alldata", getAllData);
router.delete("/deletedata", deleteData);

module.exports = router;
