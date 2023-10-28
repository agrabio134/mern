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
    // If the product is not found
    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }
    const updatedProduct = await Product.findById(id);
    res.status(200).json({ updatedProduct });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: "Server Error" }); // Respond with a JSON object
  }
});

module.exports = router;
