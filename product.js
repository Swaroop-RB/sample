const express = require("express");
const router = express.Router();

let products = [
    { id: 1, name: "Laptop", price: 50000, stock: 10 }
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


// Get all products
router.get("/", (req, res) => {
    res.json(products);
});


// Add product
router.post("/", validateProduct, (req, res) => {

    const newProduct = {
        id: products.length + 1,
        name: req.body.name,
        price: req.body.price,
        stock: req.body.stock
    };

    products.push(newProduct);

    res.json({
        message: "Product added successfully",
        product: newProduct
    });
});


// Update product
router.put("/:id", validateProductId, (req, res) => {

    const product = req.product;

    product.price = req.body.price || product.price;
    product.stock = req.body.stock || product.stock;

    res.json({
        message: "Product updated successfully",
        product
    });
});


// Delete product
router.delete("/:id", validateProductId, (req, res) => {

    const id = parseInt(req.params.id);

    products = products.filter(p => p.id !== id);

    res.json({
        message: "Product deleted successfully"
    });
});

module.exports = router;