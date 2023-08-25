const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const routes = require("./routes/taskRoute.js");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(
  "mongodb+srv://kharepushkar2804:XT2tblk8gbAnp1a6@cluster0.2rqs7yg.mongodb.net/taskDB",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
const db = mongoose.connection;
db.once("open", () => {
  console.log("Connected to MongoDB");
});

//Routes
app.use("/", routes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
