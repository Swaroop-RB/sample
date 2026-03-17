const express = require("express");
const router = express.Router();

let categories = [
    { id: 1, name: "Electronics" }
];

// GET all categories
router.get("/", (req, res) => {
    res.json(categories);
});

// GET category by ID
router.get("/:id", (req, res) => {

    const id = parseInt(req.params.id);

    const category = categories.find(c => c.id === id);

    if (!category) {
        return res.status(404).json({ message: "Category not found" });
    }

    res.json(category);
});

// POST category
router.post("/", (req, res) => {

    const category = {
        id: categories.length + 1,
        name: req.body.name
    };

    categories.push(category);

    res.json({
        message: "Category added successfully",
        category
    });
});

// DELETE category
router.delete("/:id", (req, res) => {

    const id = parseInt(req.params.id);

    categories = categories.filter(c => c.id !== id);

    res.json({
        message: "Category deleted successfully"
    });
});

module.exports = router;