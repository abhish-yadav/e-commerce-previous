const express = require("express");
const app = express();
require("./db/config");
const cors = require("cors");
const User = require("./db/User");
const Product = require("./db/Product");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

//Data Getting
app.get("/user-list", async (req, res) => {
  const user = await User.find();
  res.json(user);
  console.log(user);
});
app.get("/product-list", async (req, res) => {
  const product = await Product.find();
  res.json(product);
  console.log(product);
});

// Data Posting
app.post("/register", async (req, res) => {
  console.log({ message: req.body });
  // res.send(req.body);
  const user = await User(req.body);
  console.log(user);
  const result = await user.save();
  res.json({ message: "This is result", user });
});

app.post("/login", async (req, res) => {
  if (req.body.email && req.body.password) {
    let user = await User.findOne(req.body).select("-password");
    if (user) {
      res.json(user);
    } else {
      res.json("No User Found");
    }
  } else {
    res.json({ message: "Both email and password are required" });
  }
});

app.post("/add-product", async (req, res) => {
  const product = new Product(req.body);
  const result = await product.save();
  console.log(result);
  res.json({ message: "Product added", result });
});

//Server Launch
app.listen(9003, () => {
  console.log("Server Started at 9003 Port");
});
