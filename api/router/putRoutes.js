const express = require("express");
const router = express.Router();
const Product = require("../models/ProductModel");

router.put("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    // we cannot find the product in the database
    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }
    const updatedProduct = await Product.findById(id);
    res.status(200).json({ updatedProduct });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
