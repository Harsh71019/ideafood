import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import Hero from "../components/Hero";
import HeaderText from "../components/HeaderText";
import Product from "../components/Product";
import products from "../products";

const HomeScreen = () => {
  return (
    <>
      <Hero />
      <HeaderText headertext="checkout our products" />
      <Container className="my-3">
        <Row>
          {products.map((product) => (
            <Col key={product._id} xs={6} sm={6} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default HomeScreen;
