import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Button, Form, Col, Table, Container } from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { LinkContainer } from "react-router-bootstrap";
import { listProducts } from "../actions/productActions";
import { useDispatch, useSelector } from "react-redux";

const ProductListScreen = ({ history, match }) => {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listProducts());
    } else {
      history.push("/login");
    }
  }, [dispatch, history, userInfo]);

  const deleteProducts = (id) => {
    if (window.confirm("are you sure")) {
    }
  };

  const createProductHandler = (id) => {
    console.log("create product");
  };

  return (
    <>
      <Container>
        <Row className="align-items-center">
          <Col>
            <h1>Products you have listed in your Inventory</h1>
          </Col>
          <Col classname="text-right">
            <Button className="my-3" onClick={createProductHandler}>
              <i className="fas fa-plus"></i> Create Product
            </Button>
          </Col>
        </Row>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message>{error}</Message>
        ) : (
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th>EDIT OR DELETE PRODUCTS</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>₹{product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                      <Button variant="light" className="btn-sm">
                        <i className="fas fa-edit"></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteProducts(product._id)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Container>
    </>
  );
};

export default ProductListScreen;
