import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Button, Form, Col, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { register, googleLogin } from "../actions/userActions";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/registerscreen.styles.css";
import { GoogleLogin } from "react-google-login";
import axios from "axios";

const RegisterScreen = ({ location, history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const redirect = location.search ? location.search.split("=")[1] : "/";

  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);

  const { loading, error, userInfo } = userRegister;

  const userGoogle = useSelector((state) => state.userGoogle);

  const {
    loading: loadingGoogle,
    error: errorGoogle,
    userInfo: userInfoGoogle,
  } = userGoogle;

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
    if (userInfoGoogle) {
      history.push(redirect);
    }
  }, [history, redirect, userInfo, userInfoGoogle]);

  const submitHandler = (e) => {
    e.preventDefault();
    //Dispatch Login
    if (password !== confirmpassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(register(name, email, password, mobile));
    }
  };

  const responseGoogleSuccess = (response) => {
    dispatch(googleLogin(response.tokenId));
  };
  const responseGoogleFailure = (response) => {
    console.log("Google Auth Failed");
  };
  return (
    <FormContainer>
      <Card className="shadow-lg bg-white mt-5 card-register">
        <Card.Body>
          <h3 className="text-center headingstyles">Register</h3>
          {message && <Message variant="danger">{message}</Message>}
          {/* {error && <Message>{error}</Message>} */}
          {error && <ToastContainer />}
          {loading && <Loader />}
          {loadingGoogle && <Loader />}
          {loading && <loadingGoogle />}
          {errorGoogle && <Message variant="danger">{errorGoogle}</Message>}

          <GoogleLogin
            clientId="665853487704-ropbcipkfr277l8a36fo9ki7l59jaid0.apps.googleusercontent.com"
            buttonText="Register"
            onSuccess={responseGoogleSuccess}
            onFailure={responseGoogleFailure}
            cookiePolicy={"single_host_origin"}
          />
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

            <Button type="submit" className="btn-grad">
              Register
            </Button>
          </Form>
          <Row className="py-3">
            <Col>
              Already have an Account ?
              <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
                &nbsp;Login
              </Link>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </FormContainer>
  );
};

export default RegisterScreen;
