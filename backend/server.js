import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import colors from "colors";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoute from "./routes/orderRoute.js";
import feedbackRoute from "./routes/feedbackRoute.js";
// import razorpayRoutes from "./routes/razorpayRoutes.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import morgan, { token } from "morgan";
import path from "path";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoSanitize from "express-mongo-sanitize";
import helmet from "helmet";
import xss from "xss-clean";
import rateLimit from "express-rate-limit";
import hpp from "hpp";
import jwt from "jsonwebtoken";
// z
dotenv.config();
connectDB();
const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(cors());
app.use(express.json());
app.use(cookieParser());

//Sanitize Data
app.use(mongoSanitize());

//Set Security Headers

app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);
// Prevent CrossSite Scripting XSS

app.use(xss());

//Rate Limiting

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, //Minutes
  max: 1000,
});

app.use(limiter);

//Prevent HPP param pollution

app.use(hpp());

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoute);
app.use("/api/upload", uploadRoutes);
app.use("/api/feedback", feedbackRoute);

app.get("/api/config/paypal", (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

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
