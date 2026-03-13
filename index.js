const express = require("express");

const productRoutes = require("./product");
const categoryRoutes = require("./category");
const orderRoutes = require("./order");

const app = express();

app.use(express.json());

app.use("/products", productRoutes);
app.use("/categories", categoryRoutes);
app.use("/orders", orderRoutes);

app.listen(3000, () => {
  console.log("E-commerce backend running on port 3000");
});