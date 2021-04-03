import React from "react";
import "../styles/cardhm.styles.css";
import Rating from "../components/Rating";
import { Link } from "react-router-dom";

const Product = ({ product, match }) => {
  return (
    <div class="card card-main my-3 shadow">
      <div class="card-body card-body-main">
        <div className="image-container-card">
          <Link to={`/product/${product._id}`}>
            <img
              class="card-img-top image-card-main image-fluid"
              src={product.image}
              alt={product.name}
            />
          </Link>
        </div>
        <div class="row">
          <div className="col-6 px-0 d-flex justify-content-center">
            <p className="card-title d-flex justify-content-center mb-0">
              {product.name}
            </p>
          </div>
          <div className="col-6 px-0 d-flex justify-content-center">
            <p className="mb-0">₹ {product.price}</p>
          </div>
        </div>

        <div class="row">
          <div className="col-12 px-0 d-flex justify-content-center my-3">
            <Rating
              value={product.rating}
              text={`${product.numReviews} reviews`}
            />
          </div>
        </div>
        <div class="row">
          <div className="col-6 px-0 d-flex justify-content-center">
            <Link className="btn btn-light" to={`/product/${product._id}`}>
               Details
            </Link>
          </div>

          <div className="col-6 px-0 d-flex justify-content-center">
            {product.countInStock === 0 ? (
              <Link to="/">
                <button className="btn btn-dark">Out of Stock</button>
              </Link>
            ) : (
              <Link to={`/cart/${product._id}?qty=${1}`}>
                <button class="btn btn-danger">+ Cart</button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
