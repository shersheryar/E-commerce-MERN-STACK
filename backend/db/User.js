const mongoose = require("mongoose");

const userScheme = mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

module.exports = mongoose.model("users", userScheme);
