import express from "express";
import {
  addProduct,
  getAllProductsController,
  getProductByIdController,
  updateProductController,
  deleteProductController,
} from "../controllers/productController.js"; // Assuming controller is defined correctly

const router = express.Router();

// Route to add a product
router.post("/add-product", addProduct);
router.get("/products", getAllProductsController);
router.get("/editProduct/:id", getProductByIdController);
router.put("/updateProduct/:id", updateProductController);
router.delete("/deleteProduct/:id", deleteProductController);

export default router;
