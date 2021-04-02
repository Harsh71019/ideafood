import React, { useEffect } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Hero from "../components/Hero";
import HeaderText from "../components/HeaderText";
import Product from "../components/Product";
import { listProducts } from "../actions/productActions";

const HomeScreen = () => {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);

  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <>
      <Hero />
      <HeaderText headertext="checkout our products" />
      <Container className="my-3">
        {loading ? (
          <h2>...loading</h2>
        ) : error ? (
          <h3>{error}</h3>
        ) : (
          <Row>
            {products.map((product) => (
              <Col key={product._id} xs={6} sm={6} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </>
  );
};

export default HomeScreen;
