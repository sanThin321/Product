import pool from "../middleware/db.js";
// controllers/productController.js
import { getAllProducts,getProductById,updateProduct,deleteProduct} from "../models/productModel.js";
// Controller to add a product
export const addProduct = async (req, res) => {
  const { product_name, dzongkhag, gewog, chiwog, total_product } = req.body;

  try {
    // Insert the product into the database
    const query = `
      INSERT INTO products (product_name, dzongkhag, gewog, chiwog, total_product)
      VALUES ($1, $2, $3, $4, $5) RETURNING *;
    `;
    const values = [product_name, dzongkhag, gewog, chiwog, total_product];

    const result = await pool.query(query, values);
    res.status(201).json(result.rows[0]); // Respond with the inserted product data
  } catch (error) {
    console.error("Error inserting product:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


// Controller to get all products
export const getAllProductsController = async (req, res) => {
  try {
    // Call the model to get all products
    const products = await getAllProducts();
    res.status(200).json(products); // Respond with the list of products
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export const getProductByIdController = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await getProductById(id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch product" });
  }
};

export const updateProductController = async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body; 

  try {
    const updatedProduct = await updateProduct(id, updatedData);
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json({ error: "Failed to update product" });
  }
};

export const deleteProductController = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedProduct = await deleteProduct(id);
    if (!deletedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json(deletedProduct);
  } catch (err) {
    res.status(500).json({ error: "Failed to delete product" });
  }
};

