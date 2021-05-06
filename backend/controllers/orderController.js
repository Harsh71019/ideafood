import asyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";
import Product from "../models/orderModel.js";
import RazorPay from "razorpay";
import shortid from "shortid";
//@desc create new order
//@routes GET /api/orders
// @access Private

const addOrderItems = asyncHandler(async (req, res) => {
  const { orderItems, shippingAddress, paymentMethod } = req.body;

  const itemsPrice = orderItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  console.log(itemsPrice);

  const taxPrice = Number(0.15 * itemsPrice);

  const shippingPrice = itemsPrice > 100 ? 0 : 100;

  const totalPrice =
    100 *
    Math.round(Number(itemsPrice) + Number(shippingPrice) + Number(taxPrice));

  console.log(itemsPrice, shippingPrice, totalPrice, taxPrice, shippingAddress);

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order Items");
  } else {
    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  }
});

//@desc GET ORDER BY ID
//@routes GET /api/orders/:ID
// @access Private

const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email mobile"
  );
  if (order) {
    console.log(order);
    res.json(order);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

//@desc update order to paid
//@routes GET /api/orders/:ID/pay
// @access Private

const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.email_address,
    };

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

//@desc get orders of individual users
//@routes GET /api/orders/myorders
// @access Private

const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).sort({ _id: -1 });

  res.json(orders);
});

//@desc get all orders
//@routes GET /api/orders
// @access Private Admin

const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({})
    .populate("user", "id name")
    .sort({ _id: -1 });

  res.json(orders);
});

//@desc update order to paid
//@routes GET /api/orders/:ID/deliver
// @access Private/admin

const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});
//@desc update order to recieved
//@routes GET /api/orders/:ID/orderrecieved
// @access Private/admin

const updateOrderToRecieved = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isOrderRecieved = true;
    order.orderRecievedAt = Date.now();

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});
//@desc update order to recieved
//@routes GET /api/orders/:ID/orderrecieved
// @access Private/admin

const updateOrderToInTransit = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.orderInTransit = true;
    order.orderInTransitAt = Date.now();

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

const razorpayOrderPay = asyncHandler(async (req, res) => {
  var instance = new RazorPay({
    key_id: process.env.RAZOR_PAY_KEYID,
    key_secret: process.env.RAZOR_PAY_SECRETKEY,
  });

  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email mobile"
  );

  const currency = "INR";
  const amount = order.totalPrice;
  const receipt = shortid.generate();
  const notes = {
    desc: "nothing",
  };

  console.log(amount, currency, receipt, notes);
  instance.orders.create(
    { amount, currency, receipt, notes },
    (error, order) => {
      if (error) {
        return res.status(500).json(error);
      } else {
        return res.status(200).json(order);
      }
    }
  );
});

const razorpayOrderSuccess = asyncHandler(async (req, res) => {
  const { orderID, paymentIdRazor, signature, orderId } = req.body;
  const order = await Order.findById(orderId);
  console.log(req.body);
  console.log(order);
  if (orderID === "" || paymentIdRazor === "" || signature === "") {
    res.status(400).json("Payment Failed Please Try Again");
  } else {
    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResultRazor = {
        orderIDRazor: orderID,
        paymentIDRazor: paymentIdRazor,
        signatureIDRazor: signature,
      };
      const updatedOrder = await order.save();
    }
  }
});

//@desc fetch
//@routes GET http://localhost:5000/api/users/getusercount
// @access private admin

const getOrderCount = asyncHandler(async (req, res) => {
  const orderCount = await Order.countDocuments((count) => count);
  console.log(orderCount);

  if (orderCount) {
    res.json({ orderCount: orderCount });
  } else {
    res.status(404);
    throw new Error("orders not there");
  }
});

//@desc fetch
//@routes GET http://localhost:5000/api/orders/totalsale
// @access private admin

const getTotalSales = asyncHandler(async (req, res) => {
  const totalSales = await Order.aggregate([
    { $group: { _id: null, totalSales: { $sum: "$totalPrice" } } },
  ]);

  if (totalSales) {
    res.json({ totalSales: totalSales.pop().totalSales });
  } else {
    res.status(404);
    throw new Error("totalSales count not be generated");
  }
});

export {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  getMyOrders,
  getOrders,
  updateOrderToRecieved,
  updateOrderToInTransit,
  updateOrderToDelivered,
  razorpayOrderPay,
  razorpayOrderSuccess,
  getOrderCount,
  getTotalSales,
};
