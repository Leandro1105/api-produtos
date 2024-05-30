const router = require("express").Router();
const Produto = require("../models/Products");

// Create a new product
router.post("create/", async (req, res) => {
  const { name, description, category, brand, model, price, stock, active } =
    req.body;

  if (!name || !price) {
    return res.status(400).json({ error: "Nome e preço são obrigatórios!" });
  }

  const produto = new Produto({
    name,
    description,
    category,
    brand,
    model,
    price,
    stock,
    active,
  });

  try {
    await produto.save();
    res.status(201).json({ message: "Produto cadastrado com sucesso!" });
  } catch (err) {
    console.error("Erro ao criar produto:", err);
    res.status(500).json({
      error: "Erro ao cadastrar produto. Verifique os dados e tente novamente.",
    });
  }
});

// Get all products
router.get("getAll/", async (req, res) => {
  try {
    const produtos = await Produto.find();
    res.status(200).json(produtos);
  } catch (err) {
    console.error("Erro ao buscar produtos:", err);
    res.status(500).json({
      error: "Erro ao buscar produtos. Tente novamente mais tarde.",
    });
  }
});

// Get one product by ID
router.get("getById/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const produto = await Produto.findById(id);
    if (!produto) {
      return res.status(404).json({ error: "Produto não encontrado!" });
    }
    res.status(200).json(produto);
  } catch (err) {
    console.error("Erro ao buscar produto:", err);
    res.status(500).json({
      error: "Erro ao buscar produto. Tente novamente mais tarde.",
    });
  }
});

// Update a product by ID (PUT)
router.put("update/:id", async (req, res) => {
  const { id } = req.params;
  const { name, description, category, brand, model, price, stock, active } =
    req.body;

  if (!name || !price) {
    return res.status(400).json({ error: "Nome e preço são obrigatórios!" });
  }

  const produto = {
    name,
    description,
    category,
    brand,
    model,
    price,
    stock,
    active,
  };

  try {
    const updatedProduto = await Produto.findByIdAndUpdate(id, produto, {
      new: true,
    });

    if (!updatedProduto) {
      return res.status(404).json({ error: "Produto não encontrado!" });
    }

    res
      .status(200)
      .json({ message: "Produto atualizado com sucesso!", updatedProduto });
  } catch (err) {
    console.error("Erro ao atualizar produto:", err);
    res.status(500).json({
      error: "Erro ao atualizar produto. Verifique os dados e tente novamente.",
    });
  }
});

// Delete a product by ID
router.delete("delete/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedProduto = await Produto.findByIdAndDelete(id);

    if (!deletedProduto) {
      return res.status(404).json({ error: "Produto não encontrado!" });
    }

    res.status(200).json({ message: "Produto deletado com sucesso!" });
  } catch (err) {
    console.error("Erro ao deletar produto:", err);
    res.status(500).json({
      error: "Erro ao deletar produto. Tente novamente mais tarde.",
    });
  }
});

module.exports = router;
