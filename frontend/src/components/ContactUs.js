import React, { useState } from "react";
import { Card, Form, Button } from "react-bootstrap";
import { feedbackUser } from "../actions/feedbackAction";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ContactUs = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const dispatch = useDispatch();

  const userFeedback = useSelector((state) => state.userFeedback);

  const { loading, error, feedbackInfo, success } = userFeedback;

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(feedbackUser(name, email, description));
    setEmail("");
    setName("");
    setDescription("");
  };

  console.log(success, feedbackInfo);

  return (
    <>
      {error && <ToastContainer />}
      {success && <ToastContainer />}
      <Card className="shadow-lg w-100 card-login mt-5">
        <Card.Body>
          <h3 className="text-center headingstyles">Contact Us</h3>
          <div className="row ">
            <div className="col-md-8">
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
                <Form.Group controlId="description">
                  <Form.Label>Message</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    type="textarea"
                    placeholder="Enter Message"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Button type="submit" className="btn-grad">
                  Submit
                </Button>
              </Form>
            </div>
            <div className="col-md-4">
              <div class="d-flex flex-column">
                <div class="p-2">
                  <h3>
                    <i class="fas fa-map-marker-alt mr-2"></i>Address
                  </h3>
                  <p>
                    Akshya Nagar 1st Block 1st Cross, Rammurthy nagar,
                    Bangalore-560016
                  </p>
                </div>
                <div class="p-2">
                  <h3>
                    <i class="fas fa-mobile-alt mr-2"></i>Phone
                  </h3>
                  <p>8975484841</p>
                </div>
                <div class="p-2">
                  <h3>
                    <i class="far fa-envelope mr-2"></i>Email
                  </h3>
                  <p>dotnotemail@gmail.com</p>
                </div>
              </div>
            </div>
          </div>
        </Card.Body>
      </Card>
    </>
  );
};

export default ContactUs;
