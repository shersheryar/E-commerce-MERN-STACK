const express = require("express");
require("./db/config");
const User = require("./db/User");
const Product = require("./db/Product");
const app = express();
const cors = require("cors");
const Jwt = require("jsonwebtoken");
const jwtkey = "e-comm";
app.use(express.json());
app.use(cors());

app.post("/signup", async (req, res) => {
  let user = new User(req.body);
  let result = await user.save();
  result = result.toObject();
  delete result.password;
  Jwt.sign({ result }, jwtkey, { expiresIn: "2h" }, (err, token) => {
    if (err) {
      res.send({ result: "Something went wrong please try again later!" });
    }
    res.send({ result, auth: token });
  });
});

app.post("/login", async (req, res) => {
  if (req.body.password && req.body.email) {
    let user = await User.findOne(req.body).select("-password");
    if (user) {
      Jwt.sign({ user }, jwtkey, { expiresIn: "2h" }, (err, token) => {
        if (err) {
          res.send({ result: "Something went wrong please try again later!" });
        }
        res.send({ user, auth: token });
      });
    } else {
      res.send({ result: "No User Found" });
    }
  } else {
    res.send({ result: "No User Found" });
  }
});

app.post("/add-product", async (req, res) => {
  let product = new Product(req.body);
  let result = await product.save();
  res.send(result);
});

app.get("/products", async (req, res) => {
  let products = await Product.find();
  console.log(products);
  if (products.length > 0) {
    res.send(products);
  } else {
    res.send({ result: "No Products found" });
  }
});
app.delete("/product/:id", async (req, res) => {
  const id = req.params.id;
  const result = await Product.deleteOne({ _id: id });
  res.send(result);
});

app.get("/product/:id", async (req, res) => {
  let result = await Product.findOne({ _id: req.params.id });
  if (result) {
    res.send(result);
  } else {
    res.send({ result: "No record found." });
  }
});
app.put("/product/:id", async (req, res) => {
  let result = await Product.updateOne(
    { _id: req.params.id },
    { $set: req.body }
  );
  res.send(result);
});

app.get("/search/:key", async (req, res) => {
  let result = await Product.find({
    $or: [
      { name: { $regex: req.params.key } },
      { price: { $regex: req.params.key } },
      { category: { $regex: req.params.key } },
      { company: { $regex: req.params.key } },
    ],
  });
  res.send(result);
});
app.listen(5005);
