import React, { useState } from "react";
import { Form, Button, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";
import { savePaymentMethod } from "../actions/cartActions";
import "../styles/paymentscreen.styles.css";
import RazorPay from "../images/razorpay.svg";
import COD from "../images/cod.png";

const PaymentScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart);

  const { shippingAddress } = cart;

  const userLogin = useSelector((state) => state.userLogin);

  const { userInfo } = userLogin;

  if (!userInfo) {
    history.push("/login");
  }

  if (!shippingAddress) {
    history.push("/shipping");
  }

  const [paymentMethod, setPaymentMethod] = useState("");

  console.log(paymentMethod);

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push("/placeorder");
  };
  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />

      <h3>Payment Method</h3>

      <form onSubmit={submitHandler}>
        <Row>
          <Col>
            <label className="card-radio">
              <input
                name="plan"
                className="radio"
                type="radio"
                value="RazorPay"
                id="RazorPay"
                onChange={(e) => setPaymentMethod(e.target.value)}
              />

              <span className="plan-details">
                <span className="plan-type">Razorpay</span>
                <img
                  className="d-block w-100 image-hero"
                  src={RazorPay}
                  alt="Razorpay"
                />
              </span>
            </label>
          </Col>

          <Col>
            <label className="card-radio">
              <input
                name="plan"
                className="radio"
                type="radio"
                value="Cash On Delivery"
                id="Cash On Delivery"
                onChange={(e) => setPaymentMethod(e.target.value)}
              />

              <span className="plan-details" aria-hidden="true">
                <span className="plan-type">COD</span>
                <img
                  className="d-block w-100 image-hero"
                  src={COD}
                  alt="Cash On Delivery"
                />
              </span>
            </label>
          </Col>
        </Row>
        <Button type="submit" className="btn-grad mt-3">
          Continue
        </Button>
      </form>
    </FormContainer>
  );
};

export default PaymentScreen;
