const express = require("express");
const router = express.Router();

let products = [
    { id: 1, name: "Laptop", slug: "laptop", price: 50000, stock: 10 }
];

// Middleware to validate product data
function validateProduct(req, res, next) {

    const { name, price, stock } = req.body;

    if (!name) {
        return res.status(400).json({ message: "Product name is required" });
    }

    if (price === undefined || price <= 0) {
        return res.status(400).json({ message: "Valid product price required" });
    }

    if (stock === undefined || stock < 0) {
        return res.status(400).json({ message: "Valid stock required" });
    }

    next();
}

// Middleware to validate product ID
function validateProductId(req, res, next) {

    const id = parseInt(req.params.id);

    const product = products.find(p => p.id === id);

    if (!product) {
        return res.status(404).json({ message: "Product not found" });
    }

    req.product = product;

    next();
}

// GET all products
router.get("/", (req, res) => {
    res.json(products);
});

// GET product by ID
router.get("/id/:id", validateProductId, (req, res) => {
    res.json(req.product);
});

// GET product by slug
router.get("/slug/:slug", (req, res) => {

    const slug = req.params.slug;

    const product = products.find(p => p.slug === slug);

    if (!product) {
        return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
});

// POST create product
router.post("/", validateProduct, (req, res) => {

    const { name, price, stock } = req.body;

    const slug = name.toLowerCase().replace(/\s+/g, "-");

    const newProduct = {
        id: products.length + 1,
        name,
        slug,
        price,
        stock
    };

    products.push(newProduct);

    res.json({
        message: "Product added successfully",
        product: newProduct
    });
});

// PUT update product
router.put("/:id", validateProductId, (req, res) => {

    const product = req.product;

    const { name, price, stock } = req.body;

    if (name) {
        product.name = name;
        product.slug = name.toLowerCase().replace(/\s+/g, "-");
    }

    if (price) {
        product.price = price;
    }

    if (stock !== undefined) {
        product.stock = stock;
    }

    res.json({
        message: "Product updated successfully",
        product
    });
});

// DELETE product
router.delete("/:id", validateProductId, (req, res) => {

    const id = parseInt(req.params.id);

    products = products.filter(p => p.id !== id);

    res.json({
        message: "Product deleted successfully"
    });
});

module.exports = router;