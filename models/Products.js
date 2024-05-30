const mongoose = require("mongoose");

const Produto = mongoose.model("Produto", {
  name: String,
  description: String,
  color: String,
  weight: Number,
  category: String,
  brand: String,
  model: String,
  price: Number,
  stock: Number,
  created_at: Date,
  active: Boolean,
});

module.exports = Produto;
