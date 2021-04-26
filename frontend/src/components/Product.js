import React from "react";
import "../styles/cardhm.styles.css";
import Rating from "../components/Rating";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const Product = ({ product, match }) => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  return (
    <div className="card card-main my-3 shadow">
      <div className="image-container-card">
        <Link to={`/product/${product._id}`}>
          <img
            className="card-img-top image-card-main image-fluid"
            src={product.image}
            alt={product.name}
          />
        </Link>
      </div>
      <div className="card-body card-body-main px-3">
        <div className="row">
          <div className="col-6 px-0 d-flex justify-content-center">
            <p className="card-title d-flex justify-content-center mb-0">
              {product.name}
            </p>
          </div>
          <div className="col-6 px-0 d-flex justify-content-center">
            <p className="mb-0">₹ {product.price}</p>
          </div>
        </div>

        <div className="row">
          <div className="col-12 d-flex justify-content-center my-3">
            <Rating
              value={product.rating}
              text={`${product.numReviews} reviews`}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-6  d-flex justify-content-center ">
            <Link
              className="btn btn-light buttonincard"
              to={`/product/${product._id}`}
            >
              Details
            </Link>
          </div>

          <div className="col-6  d-flex justify-content-center">
            {product.countInStock === 0 ? (
              <Link to="/" className="btn btn-secondary buttonincard">
                No Stock
              </Link>
            ) : (
              <Link
                to={`/cart/${product._id}?qty=${1}`}
                className="btn btn-danger buttonincard"
                  // disabled={userInfo.isAdmin ? true : false}
              >
                + Cart
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
