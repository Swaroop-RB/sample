const express = require("express");
const router = express.Router();

let orders = [];

let products = [
    { id: 1, name: "Laptop", price: 50000, stock: 10 }
];

// Middleware to validate order
function validateOrder(req, res, next) {

    const { productId, quantity } = req.body;

    const product = products.find(p => p.id === productId);

    if (!product) {
        return res.status(404).json({ message: "Product not found" });
    }

    if (product.stock < quantity) {
        return res.status(400).json({ message: "Insufficient stock" });
    }

    req.product = product;

    next();
}

// GET all orders
router.get("/", (req, res) => {
    res.json(orders);
});

// GET order by ID
router.get("/:id", (req, res) => {

    const id = parseInt(req.params.id);

    const order = orders.find(o => o.id === id);

    if (!order) {
        return res.status(404).json({ message: "Order not found" });
    }

    res.json(order);
});

// CREATE order
router.post("/", validateOrder, (req, res) => {

    const { quantity } = req.body;

    const product = req.product;

    product.stock -= quantity;

    const order = {
        id: orders.length + 1,
        productId: product.id,
        quantity
    };

    orders.push(order);

    res.json({
        message: "Order created successfully",
        order
    });
});

// DELETE order
router.delete("/:id", (req, res) => {

    const id = parseInt(req.params.id);

    orders = orders.filter(o => o.id !== id);

    res.json({
        message: "Order deleted successfully"
    });
});

module.exports = router;