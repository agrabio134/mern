const express = require("express");
const router = express.Router();
const Product = require("../models/ProductModel");

router.post("/products", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json({ product });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
