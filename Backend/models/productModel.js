// models/productModel.js
import pool from "../middleware/db.js";


export const getAllProducts = async () => {
  const query = 'SELECT * FROM products;';
  const result = await pool.query(query);
  return result.rows;
};

export const getProductById = async (productId) => {
  const query = 'SELECT * FROM products WHERE id = $1;';
  const result = await pool.query(query, [productId]);
  return result.rows[0]; // Return the first (and only) row
};

export const updateProduct = async (productId, updatedData) => {
  const { 
    dzongkhag, 
    gewog, 
    chiwog, 
    product_name, 
    total_product  
  } = updatedData;

  const query = `
    UPDATE products 
    SET 
      dzongkhag = $1, 
      gewog = $2, 
      chiwog = $3, 
      product_name = $4, 
      total_product = $5
    WHERE id = $6
    RETURNING *;
  `;

  const result = await pool.query(query, [dzongkhag, gewog, chiwog, product_name, total_product, productId]);
  return result.rows[0]; // Return the updated product
};


export const deleteProduct = async (productId) => {
  const query = 'DELETE FROM products WHERE id = $1 RETURNING *;';
  const result = await pool.query(query, [productId]);
  return result.rows[0]; // Return the deleted product (optional)
};