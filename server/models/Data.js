const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
  // id: { type: String, required: true, unique: true },

  name: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  hobbies: {
    type: String,
    required: true,
  },
});

const Data = mongoose.model("Data", dataSchema);

module.exports = Data;
