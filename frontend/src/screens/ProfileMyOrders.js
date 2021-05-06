import React, { useState, useEffect, Fragment } from "react";
import {
  Row,
  Button,
  Form,
  Col,
  Container,
  Table,
  Card,
  Accordion,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { getUserDetails, updateUserProfile } from "../actions/userActions";
import { listMyOrders } from "../actions/orderActions";
import "../styles/profilemyorders.styles.css";
import FormContainer from "../components/FormContainer";

const ProfileMyOrders = ({ location, history }) => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const orderListMy = useSelector((state) => state.orderListMy);
  const { loading: loadingOrders, error: errorOrders, orders } = orderListMy;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }

    dispatch(listMyOrders());
  }, [history, userInfo, dispatch]);

  return (
    <FormContainer>
      <h3 className="text-center headingstyles">My Orders</h3>
      {loadingOrders ? (
        <Loader />
      ) : errorOrders ? (
        <Message variant="danger">{errorOrders}</Message>
      ) : (
        <Fragment>
          {orders &&
            orders.map((order) => (
              <Accordion
                defaultActiveKey="1"
                className="mt-3 shadow-lg accordian-main w-100"
              >
                <Card className="accordian-main-card w-100">
                  <Accordion.Toggle
                    as={Card.Header}
                    eventKey={order._id}
                    className="accordian-main-toggle d-flex align-items-center w-100"
                  >
                    <div className="row w-100">
                      <div class="col-6 col-md-3 justify-content-center d-flex">
                        <p className="d-flex align-items-center mb-0 p-0 ">
                          {order._id.substring(0, 10)}
                        </p>
                      </div>
                      <div class="col-6 col-md-4 justify-content-center d-flex">
                        <p className="d-flex align-items-center mb-0 p-0">
                          <i class="fas fa-calendar-week mr-1"></i>
                          {order.createdAt.substring(0, 10)}
                        </p>
                      </div>
                      <div class="col-6 col-md-2 justify-content-center d-flex">
                        <p className="d-flex align-items-center mb-0 p-0">
                          ₹{order.totalPrice / 100}
                        </p>
                      </div>
                      <div class="col-6 col-md-3 justify-content-end d-flex">
                        <p className="d-flex align-items-center mb-0 p-0">
                          {order.isDelivered ? (
                            <span className="badge bg-gradient-success">
                              Delivered
                            </span>
                          ) : (
                            <span className="badge bg-gradient-danger">
                              Not Delivered
                            </span>
                          )}
                        </p>
                      </div>
                    </div>
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey={order._id}>
                    <Card.Body className="accordian-main-card">
                      Hello! I'm the body
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
              </Accordion>
            ))}
        </Fragment>

        // <Table striped bordered hover responsive className="table-sm">
        //   <thead>
        //     <tr>
        //       <th>ID</th>
        //       <th>DATE</th>
        //       <th>TOTAL</th>
        //       <th>PAID</th>
        //       <th>DELIVERED</th>
        //       <th>View Details</th>
        //     </tr>
        //   </thead>

        //   <tbody>
        //     {orders &&
        //       orders.map((order) => (
        //         <tr key={order._id}>
        //           <td>{order._id}</td>
        //           <td>{order.createdAt.substring(0, 10)}</td>
        //           <td>₹{order.totalPrice / 100}</td>
        //           <td>
        //             {order.isPaid ? (
        //               order.paidAt.substring(0, 10)
        //             ) : (
        //               <i className="fas fa-times" style={{ color: "red" }}></i>
        //             )}
        //           </td>
        //           <td>
        //             {order.isDelivered ? (
        //               order.deliveredAt.substring(0, 10)
        //             ) : (
        //               <i className="fas fa-times" style={{ color: "red" }}></i>
        //             )}
        //           </td>

        //           <td>
        //             <LinkContainer to={`/orders/${order._id}`}>
        //               <Button className="btn-sm" variant="light">
        //                 Details
        //               </Button>
        //             </LinkContainer>
        //           </td>
        //         </tr>
        //       ))}
        //   </tbody>
        // </Table>
      )}
    </FormContainer>
  );
};

export default ProfileMyOrders;
