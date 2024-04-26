const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/jk");
const db = mongoose.connection;

db.on("", (err) => {
  console.log(err);
});
db.once("open", () => {
  console.log("Connected");
});
