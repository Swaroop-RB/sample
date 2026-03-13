const express = require("express");
const router = express.Router();

let categories = [
  { id: 1, categoryName: "Electronics" }
];

router.get("/", (req, res) => {
  res.json(categories);
});

router.post("/", (req, res) => {
  const category = {
    id: categories.length + 1,
    categoryName: req.body.categoryName
  };

  categories.push(category);

  res.json({
    message: "Category added successfully",
    category
  });
});

module.exports = router;