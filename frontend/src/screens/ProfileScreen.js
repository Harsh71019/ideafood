import React, { useState, useEffect } from "react";
import {
  Row,
  Button,
  Form,
  Col,
  Container,
  Table,
  Card,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { getUserDetails, updateUserProfile } from "../actions/userActions";
import { listMyOrders } from "../actions/orderActions";
import FormContainer from "../components/FormContainer";

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
    <FormContainer>
      {loading && <Loader />}

      {message && <Message variant="danger">{message}</Message>}
      {error && <Message>{error}</Message>}
      {success && (
        <Message variant="success">Profile update successfully</Message>
      )}
      <Card className="w-100 card-login shadow-lg">
        <Card.Body>
          <h3 className="headingstyles text-center">Your Details</h3>

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
            <Button type="submit" className="btn-grad mt-2">
              Update
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </FormContainer>
  );
};

export default ProfileScreen;
