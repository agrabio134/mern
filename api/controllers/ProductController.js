const Product = require("../models/ProductModel");

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ products });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
};

const getProductById =  async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(req.params.id);
    res.status(200).json({ product });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
};

const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json({ product });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
};

const updateProduct =  async (req, res) => {
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
    res.status(500).json({ error: "Server Error" }); 
  }
};

const deleteProduct = async (req, res) => {
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
};

module.exports = {getAllProducts, getProductById, createProduct, updateProduct, deleteProduct};
