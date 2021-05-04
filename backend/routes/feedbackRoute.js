import express, { Router } from "express";
const router = express.Router();
import {
  feedbackPost,
  getFeedback,
} from "../controllers/feedbackController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").post(feedbackPost).get(protect, admin, getFeedback);

export default router;
