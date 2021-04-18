import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import colors from "colors";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoute from "./routes/orderRoute.js";
// import razorpayRoutes from "./routes/razorpayRoutes.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import morgan from "morgan";
import path from "path";
import cors from "cors";
import RazorPay from "razorpay";
import shortid from "shortid";

// z
dotenv.config();
connectDB();
const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(cors());
app.use(express.json());
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoute);
app.use("/api/upload", uploadRoutes);
// app.use("/api/razorpay", razorpayRoutes);

app.get("/api/config/paypal", (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

// app.post("/api/razorpay", async (req, res) => {
//   const payment_capture = 1;
//   const amount = 500;
//   const currency = "INR";

//   const options = {
//     amount,
//     currency,
//     receipt: shortid.generate(),
//     payment_capture,
//   };

//   const response = await razorpay.orders.create(options);
//   console.log(response)
// });

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API IS RUNNING");
  });
}

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `"Server Running in ${process.env.NODE_ENV} on Port ${PORT}"`.yellow.bold
  )
);
