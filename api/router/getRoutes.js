const express = require("express");
const router = express.Router();
const Product = require("../models/ProductModel");

router.get("/", (req, res) => {
  res.send("Hello World!");
});

router.get("/products", async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ products });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

router.get("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(req.params.id);
    res.status(200).json({ product });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
