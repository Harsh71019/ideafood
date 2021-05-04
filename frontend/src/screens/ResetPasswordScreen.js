import React, { useState, useEffect } from "react";
import { Button, Form, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { resetPasswordAction } from "../actions/userActions";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ResetPasswordScreen = ({ location, history, match }) => {
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const resetLink = match.params.id;

  const dispatch = useDispatch();

  const resetPassword = useSelector((state) => state.resetPassword);

  const { loading, error, success } = resetPassword;

  useEffect(() => {
    if (success) {
      history.push("/login");
    }
  }, [history, success]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmpassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(resetPasswordAction(resetLink, password));
    }
  };

  return (
    <FormContainer>
      {message && <Message variant="danger">{message}</Message>}
      {error && <ToastContainer />}
      {loading && <Loader />}
      <Card className="shadow-lg card-login">
        <Card.Body>
        <h3 className="headingstyles text-center">Reset Password</h3>

          <Form onSubmit={submitHandler}>
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
              Change Password
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </FormContainer>
  );
};

export default ResetPasswordScreen;
