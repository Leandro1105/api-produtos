const mongoose = require("mongoose");

const Produto = mongoose.model("Produto", {
  name: String,
  description: String,
  category: String,
  brand: String,
  model: String,
  price: Number,
  stock: Number,
  active: Boolean,
});

module.exports = Produto;
