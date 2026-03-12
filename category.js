const express = require("express");
const app = express();

app.use(express.json());

let categories = [
    { id: 1, categoryName: "Electronics" },
    { id: 2, categoryName: "Clothing" }
];


// GET all categories
app.get("/categories", (req, res) => {
    res.json(categories);
});


// ADD new category
app.post("/categories", (req, res) => {

    const newCategory = {
        id: categories.length + 1,
        categoryName: req.body.categoryName
    };

    categories.push(newCategory);

    res.json({
        message: "Category added successfully",
        data: newCategory
    });
});

app.listen(5000, () => {
    console.log("Category service running on port 5000");
});