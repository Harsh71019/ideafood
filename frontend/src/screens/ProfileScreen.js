import React, { useState, useEffect } from "react";
import { Row, Button, Form, Col, Container, Table } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { getUserDetails, updateUserProfile } from "../actions/userActions";
import { listMyOrders } from "../actions/orderActions";

const ProfileScreen = ({ location, history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);

  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);

  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);

  const { success } = userUpdateProfile;

  const orderListMy = useSelector((state) => state.orderListMy);

  const { loading: loadingOrders, error: errorOrders, orders } = orderListMy;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (!user.name) {
        dispatch(getUserDetails("profile"));
        dispatch(listMyOrders());
      } else {
        setName(user.name);
        setEmail(user.email);
        setMobile(user.mobile);
      }
    }
  }, [history, userInfo, dispatch, user]);

  const submitHandler = (e) => {
    e.preventDefault();
    //Dispatch Login
    if (password !== confirmpassword) {
      setMessage("Passwords do not match");
    } else {
      //Dispatch Update profile
      dispatch(
        updateUserProfile({ id: user._id, name, email, password, mobile })
      );
    }
  };
  return (
    <Container>
      <Row className="mt-5">
        <Col md={3}>
          <h3>Your Details</h3>
          {message && <Message variant="danger">{message}</Message>}
          {error && <Message>{error}</Message>}
          {success && (
            <Message variant="success">Profile update successfully</Message>
          )}
          {loading && <Loader />}
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="confirmpassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                value={confirmpassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="mobile">
              <Form.Label>Mobile</Form.Label>
              <Form.Control
                type="tel"
                maxLength="10"
                minLength="10"
                placeholder="Enter Mobile"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Button type="submit" variant="primary">
              Update
            </Button>
          </Form>
        </Col>
        <Col md={9}>
          <h5>My Orders</h5>
          {loadingOrders ? (
            <Loader />
          ) : errorOrders ? (
            <Message variant="danger">{errorOrders}</Message>
          ) : (
            <Table striped bordered hover responsive className="table-sm">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>DATE</th>
                  <th>TOTAL</th>
                  <th>PAID</th>
                  <th>DELIVERED</th>
                  <th>View Details</th>
                </tr>
              </thead>

              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.createdAt.substring(0, 10)}</td>
                    <td>₹{order.totalPrice / 100}</td>
                    <td>
                      {order.isPaid ? (
                        order.paidAt.substring(0, 10)
                      ) : (
                        <i className="fas fa-times" style={{ color: "red" }}></i>
                      )}
                    </td>
                    <td>
                      {order.isDelivered ? (
                        order.deliveredAt.substring(0, 10)
                      ) : (
                        <i className="fas fa-times" style={{ color: "red" }}></i>
                      )}
                    </td>

                    <td>
                      <LinkContainer to={`/orders/${order._id}`}>
                        <Button className="btn-sm" variant="light">
                          Details
                        </Button>
                      </LinkContainer>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ProfileScreen;
