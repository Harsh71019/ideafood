import React, { useEffect } from "react";
import { Row, Col, Container, Pagination } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Hero from "../components/Hero";
import HeaderText from "../components/HeaderText";
import Product from "../components/Product";
import { listProducts } from "../actions/productActions";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { Helmet } from "react-helmet";
import Paginate from "../components/Paginate";
import Meta from "../components/Meta";
import { Link } from "react-router-dom";

const HomeScreen = ({ match }) => {
  const keyword = match.params.keyword;

  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);

  const { loading, error, products, page, pages } = productList;

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  return (
    <>
      <Meta />

      <Hero />
      <HeaderText headertext="checkout our products" />
      <Container className="my-3">
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <>
            <Row>
              {products.map((product) => (
                <Col key={product._id} xs={12} sm={6} md={6} lg={4} xl={3}>
                  <Product product={product} />
                </Col>
              ))}
            </Row>
            <Paginate
              page={page}
              pages={pages}
              keyword={keyword ? keyword : ""}
            />
          </>
        )}
      </Container>
    </>
  );
};

export default HomeScreen;
