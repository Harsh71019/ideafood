import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

//@desc fetch all products
//@routes GET /api/products
// @access Public

const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});



//@desc fetch single products 
//@routes GET /api/products/:id
// @access Public

const getProductbyId = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not Defined");
  }
});


export {getProductbyId,getProducts}