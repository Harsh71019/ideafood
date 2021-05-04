import React, { useEffect } from "react";
import { Button, Table, Container } from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { LinkContainer } from "react-router-bootstrap";
import { listOrders } from "../actions/orderActions";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment-timezone";

const OrderListScreen = ({ history }) => {
  const dispatch = useDispatch();

  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listOrders());
    } else {
      history.push("/login");
    }
  }, [dispatch, history, userInfo]);

  var dateConvert = moment(orders.createdAt)
    .tz("Asia/Kolkata")
    .format("dddd, MMMM Do YYYY, hh:mm:ss a");

  return (
    <>
      <Container>
        <h1>Customer Orders</h1>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message>{error}</Message>
        ) : (
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>USER</th>
                <th>DATE && TIME</th>
                <th>TOTAL PRICE</th>
                <th>PAID</th>
                <th>DELIVERED</th>
              </tr>
            </thead>
            s
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.user && order.user.name}</td>
                  <td>{dateConvert}</td>

                  <td>₹{order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      <i
                        className="fas fa-check"
                        style={{ color: "green" }}
                      ></i>
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
                    <LinkContainer to={`/admin/orders/${order._id}`}>
                      <Button variant="light" className="btn-sm">
                        View Details
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Container>
    </>
  );
};

export default OrderListScreen;
