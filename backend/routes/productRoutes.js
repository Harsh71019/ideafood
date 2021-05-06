import express, { Router } from "express";
const router = express.Router();
import {
  getProducts,
  getProductbyId,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getProductCount,
  getTopProducts,
} from "../controllers/productControllers.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").get(getProducts).post(protect, admin, createProduct);
router.route("/:id/reviews").post(protect, createProductReview);
router.route("/getproductcount").get(protect, admin, getProductCount);
router.get("/top", getTopProducts);

router
  .route("/:id")
  .get(getProductbyId)
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, updateProduct);

export default router;
