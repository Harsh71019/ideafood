import express, { Router } from "express";
const router = express.Router();
import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  getMyOrders,
  getOrders,
  updateOrderToDelivered,
  razorpayOrderPay,
  razorpayOrderSuccess,
  updateOrderToRecieved,
  updateOrderToInTransit,
  getOrderCount,
  getTotalSales,
  getOrdersPerDay,
  orderStatsMisc,
} from "../controllers/orderController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").post(protect, addOrderItems).get(protect, admin, getOrders);
router.route("/myorders").get(protect, getMyOrders);
router.route("/:id").get(protect, getOrderById);
router.route("/:id/pay").put(protect, updateOrderToPaid);
router.route("/:id/receive").put(protect, admin, updateOrderToRecieved);
router.route("/:id/transit").put(protect, admin, updateOrderToInTransit);
router.route("/:id/deliver").put(protect, admin, updateOrderToDelivered);
router.route("/getordercount/orders").get(protect, admin, getOrderCount);
router.route("/getorders/totalsales").get(protect, admin, getTotalSales);
router.route("/razorpay/:id").get(protect, razorpayOrderPay);
router.route("/razorpayment").post(protect, razorpayOrderSuccess);

router.route("/total/orders/day").get(getOrdersPerDay);
router.route("/total/ordersmisc").get(orderStatsMisc);

export default router;
