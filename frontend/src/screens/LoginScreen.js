import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Button, Form, Col, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { login } from "../actions/userActions";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/loginscreen.styles.css";
import LoginImage from "../images/LoginImage.svg";

const LoginScreen = ({ location, history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const redirect = location.search ? location.search.split("=")[1] : "/";

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);

  const { loading, error, userInfo, success } = userLogin;

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, redirect, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    //Dispatch Login
    dispatch(login(email, password));
  };

  return (
    <FormContainer>
      {error && <ToastContainer />}
      {loading && <Loader />}
      <Card className="shadow-lg mt-5 card-login">
        <Card.Body>
          <h3 className="text-center headingstyles">Welcome Back!</h3>
          <Form onSubmit={submitHandler}>
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

            <Row className="py-1 ">
              <Col>
                <Button type="submit" className="btn-grad">
                  Sign In
                </Button>
              </Col>
              <Col className="d-flex justify-content-end">
                <Link className="forgotpassword-btn" to="/forgot-password">
                  <Button className="forgotpassword-btn">
                    Forgot Password
                  </Button>
                </Link>
              </Col>
            </Row>
          </Form>
          <Row className="py-3">
            <Col>
              New Customer ?
              <Link
                to={redirect ? `/register?redirect=${redirect}` : "/register"}
              >
                &nbsp;Register
              </Link>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </FormContainer>
  );
};

export default LoginScreen;
