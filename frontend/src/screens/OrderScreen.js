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
import { getOrderDetails, razorSuccess } from "../actions/orderActions";
import axios from "axios";
import { ORDER_PAY_RESET } from "../constants/orderConstants";

const OrderScreen = ({ match }) => {
  const [payment, setPayment] = useState("");
  const [razorPayLoading, setRazorPayLoading] = useState(false);

  const dispatch = useDispatch();
  const orderId = match.params.id;

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const { success: successPay, loading: loadingPay } = orderPay;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const razorPay = useSelector((state) => state.razorPay);
  const { success: razorSuccessFull } = razorPay;


  useEffect(() => {
    dispatch(getOrderDetails(match.params.id));
    console.log(razorSuccessFull);
  }, [dispatch, razorPayLoading]);
  const RazorPayBuyHandler = async (e) => {
    e.preventDefault();

    setRazorPayLoading(true);
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const res = await axios.get(
      `http://localhost:5000/api/orders/razorpay/${orderId}`,
      config
    );

    if (res.status !== 200) {
      return;
    }
    var options = {
      key: "rzp_test_MVoe6kMealAgpv",
      amount: Number(res.data.amount),
      currency: res.data.currency,
      name: "Idea Food",
      description: "Hey suckka",
      image: "https://example.com/your_logo",
      order_id: res.data.id,
      handler: function (response) {
        setPayment(true);
        dispatch(
          razorSuccess(
            response.razorpay_order_id,
            response.razorpay_payment_id,
            response.razorpay_signature,
            orderId
          )
        );
      },
    };
    var rzp1 = new window.Razorpay(options);
    rzp1.open();

    rzp1.on("payment.failed", function (response) {
      console.log(response.error);
    });
  };

  console.log(order)

  return loading ? (
    <Container className="mt-58">
      <Loader />
    </Container>
  ) : error ? (
    <Container className="mt-58">
      <Message variant="danger">{error}</Message>
    </Container>
  ) : (
    <>
      <Container className="mt-58">
        <h5> Order {order._id} </h5>
        <Row>
          <Col md={8}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h4>Shipping</h4>
                <p>
                  <strong>Name:</strong> {order.user.name}
                </p>
                <p>
                  <strong>Mobile:</strong> {order.user.mobile}
                </p>
                <p>
                  <strong>Email:</strong>
                  <a href={`mailto:${order.user.email}`}> {order.user.email}</a>
                </p>

                <p>
                  <strong>Address:</strong>
                  {order.shippingAddress.address},{order.shippingAddress.city},
                  {order.shippingAddress.postalCode},
                  {order.shippingAddress.country}
                </p>

                {order.isDelivered ? (
                  <Message variant="success">
                    Delivered on {order.deliveredAt}
                  </Message>
                ) : (
                  <Message variant="danger">Not Delivered</Message>
                )}
              </ListGroup.Item>
              <ListGroup.Item>
                <h5>Payment Method</h5>
                <p>
                  <strong>Method: </strong>
                  {/* {order.paymentMethod} */}
                </p>
                {order.isPaid ? (
                  <Message variant="success">Paid on {order.paidAt}</Message>
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
                    <Col>₹{order.totalPrice / 100}</Col>
                  </Row>
                </ListGroup.Item>
                {!order.isPaid && (
                  <ListGroup.Item>
                    <Button
                      className="btn btn-info w-100"
                      onClick={RazorPayBuyHandler}
                      disabled={razorPayLoading}
                      type="submit"
                    >
                      RazorPay
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

export default OrderScreen;
