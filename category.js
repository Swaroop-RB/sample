const express = require("express");
const router = express.Router();

let categories = [
    { id: 1, name: "Electronics" }
];


// Get all categories
router.get("/", (req, res) => {
    res.json(categories);
});


// Add category
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

module.exports = router;