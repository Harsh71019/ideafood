import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

//@desc fetch all products
//@routes GET /api/products
// @access Public

const getProducts = asyncHandler(async (req, res) => {
  const pageSize = 12;
  const page = Number(req.query.pageNumber) || 1;
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};

  const count = await Product.countDocuments({ ...keyword });
  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  res.json({ products, page, pages: Math.ceil(count / pageSize) });
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

//@desc Delete a single product
//@routes DELETE /api/products/:id
// @access PRIVATE ADMIN

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await product.remove();
    res.json({ message: "Product Removed Successfully" });
  } else {
    res.status(404);
    throw new Error("Product not Defined");
  }
});

//@desc Create a single product
//@routes POST /api/products
// @access PRIVATE ADMIN

const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: "Sample Name",
    price: 0,
    user: req.user._id,
    image: "/images/sample.png",
    brand: "Sample Brand",
    category: "Sample Category",
    countInStock: 0,
    numReviews: 0,
    description: "Sample Description",
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

//@desc Update a Single Prodcct
//@routes POST /api/products/:id
// @access PRIVATE ADMIN

const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    description,
    image,
    brand,
    category,
    countInStock,
  } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

//@desc Create a new review
//@routes POST /api/products/:id/review
// @access PRIVATE

const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error("Product already reviewed");
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();
    res.status(201).json({ message: "Review Added!" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

//@desc fetch
//@routes GET http://localhost:5000/api/products/getproductcount
// @access private admin

const getProductCount = asyncHandler(async (req, res) => {
  const productCount = await Product.countDocuments((count) => count);

  if (productCount) {
    res.json({ productCount: productCount });
  } else {
    res.status(404);
    throw new Error("Products not there");
  }
});

// @desc    Get top rated products
// @route   GET /api/products/top
// @access  Public
const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(3);

  res.json(products);
});

export {
  getProductbyId,
  getProducts,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getProductCount,
  getTopProducts,
};
