import React, { useState, useEffect } from "react";
import "./App.css";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");


const App = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: "", price: "", image: "" });
  const [editingProduct, setEditingProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const addProduct = async () => {
    try {
      const response = await fetch("http://localhost:3000/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });
      const data = await response.json();
      console.log(data); // Handle the response data as needed
      // Refresh the product list
      fetchProducts();
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:3000/products"); // Replace this URL with your actual API endpoint
      const data = await response.json();
      setProducts(data.products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const editProduct = (product) => {
    setEditingProduct(product);
    setNewProduct({ name: product.name, price: product.price, image: product.image });
    setShowModal(true);
  };

  const saveEditedProduct = async () => {
    try {
      const response = await fetch(`http://localhost:3000/products/${editingProduct._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: newProduct.name || editingProduct.name,
          price: newProduct.price || editingProduct.price,
          image: newProduct.image || editingProduct.image,
        }),
      });
      const data = await response.json();
      console.log(data); // Handle the response data as needed
      setEditingProduct(null);
      setShowModal(false);
      // Refresh the product list
      fetchProducts();
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/products/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      console.log(data); // Handle the response data as needed
      // Refresh the product list
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);


  return (
    <div className="product-list">
      <h1>Product List</h1>
      <div className="products">
        {products.map((product, index) => (
          <div key={index} className="product">
            <img src={product.image} alt={product.name} />
            <div className="product-details">
              <h2>{product.name}</h2>
              <p>Price: ${product.price}</p>
              <button onClick={() => editProduct(product)}>Edit</button>
              <button onClick={() => deleteProduct(product.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <Modal
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
        style={customStyles}
        contentLabel="Edit Product Modal"
      >
        <div className="modal">
          <div className="modal-content">
            <h2>Edit Product</h2>
            <input
              type="text"
              placeholder="Product Name"
              name="name"
              value={newProduct.name}
              onChange={handleInputChange}
            />
            <input
              type="text"
              placeholder="Price"
              name="price"
              value={newProduct.price}
              onChange={handleInputChange}
            />
            <input
              type="text"
              placeholder="Image URL"
              name="image"
              value={newProduct.image}
              onChange={handleInputChange}
            />
            <button onClick={saveEditedProduct}>Save</button>
          </div>
        </div>
      </Modal>
      <div className="add-product-form">
        <h2>Add Product</h2>
        <input
          type="text"
          placeholder="Product Name"
          name="name"
          value={newProduct.name}
          onChange={handleInputChange}
        />
        <input
          type="text"
          placeholder="Price"
          name="price"
          value={newProduct.price}
          onChange={handleInputChange}
        />
        <input
          type="text"
          placeholder="Image URL"
          name="image"
          value={newProduct.image}
          onChange={handleInputChange}
        />
        <button onClick={addProduct}>Add Product</button>
      </div>
    </div>
  );
};

export default App;