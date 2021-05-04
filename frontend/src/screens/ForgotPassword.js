import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Button, Form, Col, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { forgotPasswordAction } from "../actions/userActions";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const dispatch = useDispatch();

  const forgotPassword = useSelector((state) => state.forgotPassword);
  const { loading, error, success } = forgotPassword;

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(forgotPasswordAction(email));
  };

  return (
    <>
      <FormContainer>
        <Card className="shadow-lg bg-white mt-5 card-login">
          <Card.Body>
            <h3 className="headingstyles text-center"> Please Enter Your Email To Reset Password</h3>
            {error && <ToastContainer />}
            {loading && <Loader />}
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
              <Row className="py-1">
                <Col className="justify-content-center d-flex">
                  <Button className="btn-grad" type="submit" variant="primary">
                    Submit
                  </Button>
                </Col>
              </Row>
            </Form>
          </Card.Body>
        </Card>
      </FormContainer>
      {success && <ToastContainer />}
    </>
  );
};

export default ForgotPassword;
