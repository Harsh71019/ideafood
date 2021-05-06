import React, { Fragment, useState, useEffect } from "react";
import {
  Button,
  Row,
  Col,
  Image,
  Card,
  ListGroup,
  Container,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";
import Message from "../components/Message";
import {
  getOrderDetails,
  payOrder,
  deliverOrderAction,
  recieveOrderAction,
  orderTransitAction,
} from "../actions/orderActions";
import axios from "axios";
import {
  ORDER_PAY_RESET,
  ORDER_DELIVER_RESET,
  ORDER_TRANSIT_RESET,
  ORDER_RECEIVE_RESET,
} from "../constants/orderConstants";
import moment from "moment-timezone";

const OrderDetailsAdmin = ({ match, history }) => {
  const orderId = match.params.id;
  const dispatch = useDispatch();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const orderPay = useSelector((state) => state.orderPay);
  const { success: successPay, loading: loadingPay } = orderPay;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { success: successDeliver, loading: loadingDeliver } = orderDeliver;

  const orderRecieve = useSelector((state) => state.orderRecieve);
  const { success: successReceive, loading: loadingReceive } = orderRecieve;

  const orderTransit = useSelector((state) => state.orderTransit);
  const { success: successTransit, loading: loadingTransit } = orderTransit;

  if (!loading) {
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2);
    };

    //calculate Prices

    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    );
  }

  useEffect(() => {
    dispatch(getOrderDetails(match.params.id));

    if (!userInfo) {
      history.push("/login");
    }

    if (!order || successDeliver) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch(getOrderDetails(orderId));
    }
    if (!order || successReceive) {
      dispatch({ type: ORDER_RECEIVE_RESET });
      dispatch(getOrderDetails(orderId));
    }
    if (!order || successTransit) {
      dispatch({ type: ORDER_TRANSIT_RESET });
      dispatch(getOrderDetails(orderId));
    }
  }, [dispatch, successPay]);

  const deliverHandler = () => {
    dispatch(deliverOrderAction(order));
  };
  const receiveHandler = () => {
    dispatch(recieveOrderAction(order));
  };
  const transitHandler = () => {
    dispatch(orderTransitAction(order));
  };

  return loading ? (
    <Container className="mt-5">
      <Loader />
    </Container>
  ) : error ? (
    <Container className="mt-5">
      <Message variant="danger">{error}</Message>
    </Container>
  ) : (
    <>
      <Container className="mt-5">
        <h5> Order {order._id} </h5>
        <Row>
          <Col md={8}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h4>Shipping</h4>
                <p>
                  <strong>Name:</strong> {order.user.name}{" "}
                </p>
                <p>
                  <strong>Mobile:</strong> {order.user.mobile}{" "}
                </p>
                <p>
                  <strong>Email:</strong>{" "}
                  <a href={`mailto:${order.user.email}`}>
                    {" "}
                    {order.user.email}{" "}
                  </a>
                </p>

                <p>
                  <strong>Address:</strong>
                  {order.shippingAddress.address},{order.shippingAddress.city},
                  {order.shippingAddress.postalCode},
                  {order.shippingAddress.country}
                </p>

                {order.isOrderRecieved ? (
                  <Message variant="success">
                    Order Seen by Seller on&nbsp;
                    {moment(order.deliveredAt)
                      .tz("Asia/Kolkata")
                      .format("dddd, MMMM Do YYYY, hh:mm:ss a")}
                  </Message>
                ) : (
                  <Message variant="danger">
                    Order not Acknowledged by Seller
                  </Message>
                )}
                {order.orderInTransit ? (
                  <Message variant="success">
                    Your order is on the way!&nbsp;
                    {moment(order.deliveredAt)
                      .tz("Asia/Kolkata")
                      .format("dddd, MMMM Do YYYY, hh:mm:ss a")}
                  </Message>
                ) : (
                  <Message variant="danger">Not in Transit</Message>
                )}
                {order.isDelivered ? (
                  <Message variant="success">
                    Delivered on&nbsp;
                    {moment(order.deliveredAt)
                      .tz("Asia/Kolkata")
                      .format("dddd, MMMM Do YYYY, hh:mm:ss a")}
                  </Message>
                ) : (
                  <Message variant="danger">Not Delivered</Message>
                )}
              </ListGroup.Item>
              <ListGroup.Item>
                <h5>Payment Method</h5>
                <p>
                  <strong>Method: </strong>
                  {order.paymentMethod}
                </p>
                {order.isPaid ? (
                  <Message variant="success">
                    Paid on&nbsp;
                    {moment(order.paidAt)
                      .tz("Asia/Kolkata")
                      .format("dddd, MMMM Do YYYY, hh:mm:ss a")}
                  </Message>
                ) : (
                  <Message variant="danger">Not Paid</Message>
                )}
              </ListGroup.Item>
              <ListGroup.Item>
                <h5>Order Items</h5>
                {order.orderItems.length === 0 ? (
                  <Message>Your Order is Empty</Message>
                ) : (
                  <ListGroup variant="flush">
                    {order.orderItems.map((item, index) => (
                      <ListGroup.Item key={index}>
                        <Row>
                          <Col md={1}>
                            <Image
                              fluid
                              rounded
                              src={item.image}
                              alt={item.name}
                            ></Image>
                          </Col>

                          <Col>
                            <Link to={`/product/${item.product}`}>
                              {item.name}
                            </Link>
                          </Col>
                          <Col md={4}>
                            {item.qty} X ₹{item.price} = ₹
                            {item.qty * item.price}
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                )}
              </ListGroup.Item>
            </ListGroup>
          </Col>

          <Col md={4}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h5>Order Summary</h5>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Shipping</Col>
                    <Col>₹{order.shippingPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Items</Col>
                    <Col>₹{order.itemsPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Tax</Col>
                    <Col>₹{order.taxPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Total</Col>
                    <Col>₹{order.totalPrice}</Col>
                  </Row>
                </ListGroup.Item>
                {/* {!order.isPaid && (
                  <ListGroup.Item>
                    {loadingPay && <Loader />}
                    {!sdkReady ? (
                      <Loader />
                    ) : (
                      <PayPalButton
                        amount={order.totalPrice}
                        onSuccess={successPaymentHandler}
                      />
                    )}
                  </ListGroup.Item>
                )} */}

                {loadingReceive && <Loader />}
                {!order.isOrderRecieved && (
                  <ListGroup.Item>
                    <Button
                      type="button"
                      className="btn-primary btn-block"
                      onClick={receiveHandler}
                    >
                      Mark as Order Received
                    </Button>
                  </ListGroup.Item>
                )}
                {loadingTransit && <Loader />}
                {!order.orderInTransit && (
                  <ListGroup.Item>
                    <Button
                      type="button"
                      className="btn-warning btn-block"
                      onClick={transitHandler}
                    >
                      Mark as in Transit
                    </Button>
                  </ListGroup.Item>
                )}
                {loadingDeliver && <Loader />}
                {!order.isDelivered && (
                  <ListGroup.Item>
                    <Button
                      type="button"
                      className="btn-success btn-block"
                      onClick={deliverHandler}
                    >
                      Mark as Delivered
                    </Button>
                  </ListGroup.Item>
                )}
              </ListGroup>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default OrderDetailsAdmin;
