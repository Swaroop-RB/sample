const express = require("express");
const router = express.Router();

let products = [
  { id: 1, name: "Laptop", price: 50000, stock: 10 }
];

router.get("/", (req, res) => {
  res.json(products);
});

router.post("/", (req, res) => {
  const product = {
    id: products.length + 1,
    name: req.body.name,
    price: req.body.price,
    stock: req.body.stock
  };

  products.push(product);

  res.json({
    message: "Product added successfully",
    product
  });
});

router.put("/:id", (req, res) => {
  const product = products.find(p => p.id == req.params.id);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  product.name = req.body.name || product.name;
  product.price = req.body.price || product.price;
  product.stock = req.body.stock || product.stock;

  res.json({
    message: "Product updated",
    product
  });
});

router.delete("/:id", (req, res) => {
  products = products.filter(p => p.id != req.params.id);

  res.json({ message: "Product deleted successfully" });
});

module.exports = router;