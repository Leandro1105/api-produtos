const router = require("express").Router();
const Produto = require("../models/Products");

// Test the API
router.get("/", async (req, res) => {
  return res.status(200).json("The API is working");
});

// Get all products
router.get("/getAll", async (req, res) => {
  try {
    const produtos = await Produto.find();
    res.status(200).json(produtos);
  } catch (err) {
    console.error("Error to find products:", err);
    res.status(500).json({
      success: false,
      error: "Error to find products, the upstream server returned 500.",
    });
  }
});

// Get one product by ID
router.get("/getById/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const produto = await Produto.findById(id);
    if (!produto) {
      return res
        .status(404)
        .json({ success: false, error: "Product not found." });
    }
    res.status(200).json(produto);
  } catch (err) {
    console.error("Error to find product:", err);
    res.status(500).json({
      success: false,
      error: "Error to find product, verify the data.",
    });
  }
});

// Create a new product
router.post("/create", async (req, res) => {
  const {
    name,
    description,
    color,
    weight,
    category,
    brand,
    model,
    price,
    stock,
    active,
  } = req.body;

  const created_at = new Date();

  if (!name || !price || !description || !stock || !active) {
    return res.status(400).json({
      success: false,
      error: "Name, price, description, stock and active are required",
    });
  }

  const produto = new Produto({
    name,
    description,
    color,
    weight,
    category,
    brand,
    model,
    price,
    stock,
    created_at,
    active,
  });

  try {
    await produto.save();
    res
      .status(201)
      .json({ success: true, message: "Product created.", produto });
  } catch (err) {
    console.error("Error to create product:", err);
    res.status(500).json({
      success: false,
      error: "Error to create product, verify the data.",
    });
  }
});

// Update a product by ID
router.put("/update/:id", async (req, res) => {
  const { id } = req.params;
  const {
    name,
    description,
    color,
    weight,
    category,
    brand,
    model,
    price,
    stock,
    active,
  } = req.body;

  if (!name || !price || !description || !stock || !active) {
    return res.status(400).json({
      success: false,
      error: "Name, price, description, stock and active are required",
    });
  }

  const produto = {
    name,
    description,
    color,
    weight,
    category,
    brand,
    model,
    price,
    stock,
    active,
  };

  try {
    const updatedProduct = await Produto.findByIdAndUpdate(id, produto, {
      new: true,
    });

    if (!updatedProduct) {
      return res
        .status(404)
        .json({ success: false, error: "Product not found." });
    }

    res
      .status(200)
      .json({ success: true, message: "Product updated.", updatedProduct });
  } catch (err) {
    console.error("Error to update product:", err);
    res.status(500).json({
      success: false,
      error: "Error to update product, verify the data.",
    });
  }
});

// Delete a product by ID
router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedProduct = await Produto.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res
        .status(404)
        .json({ success: false, error: "Product not found." });
    }

    res
      .status(200)
      .json({ success: true, message: "Product deleted.", deletedProduct });
  } catch (err) {
    console.error("Error to delete product:", err);
    res.status(500).json({
      success: false,
      error: "Error to delete product, verify the data.",
    });
  }
});

module.exports = router;
