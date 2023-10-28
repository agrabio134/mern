const express = require("express");
const router = express.Router();
const Product = require("../models/ProductModel");

router.delete("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    // we cannot find the product in the database
    if (!deletedProduct) {
      return res.status(404).json({ msg: "Product not found" });
    }
    res.status(200).json({ deletedProduct });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
