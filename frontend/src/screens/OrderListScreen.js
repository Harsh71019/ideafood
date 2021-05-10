import React, { useEffect } from "react";
import { Button, Table, Container, Card } from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { LinkContainer } from "react-router-bootstrap";
import { listOrders } from "../actions/orderActions";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment-timezone";
import "../styles/tables.styles.css";
import AdminDashboardNav from "../components/AdminDashboardNav";

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
        <AdminDashboardNav />
        {loading ? (
          <Loader />
        ) : error ? (
          <Message>{error}</Message>
        ) : (
          <Card className="card-login w-100 table-card-border shadow-lg">
            <Card.Body className="px-0 pt-0 pb-2">
              <h3 className="headingstyles text-center mt-3 mb-3">
                All Orders
              </h3>
              <div class="table-responsive p-0">
                <table className="table align-items-center mb-0">
                  <thead>
                    <tr>
                      <th className="th-border-none fontstylesth">ID</th>
                      <th className="th-border-none fontstylesth">USER</th>
                      <th className="th-border-none fontstylesth">
                        DATE & TIME
                      </th>
                      <th className="th-border-none fontstylesth">
                        TOTAL PRICE
                      </th>
                      <th className="th-border-none fontstylesth">PAID</th>
                      <th className="th-border-none fontstylesth">DELIVERED</th>
                      <th className="th-border-none fontstylesth">DETAILS</th>
                    </tr>
                  </thead>

                  <tbody>
                    {orders.map((order) => (
                      <tr key={order._id}>
                        <td className="text-table">{order._id}</td>
                        <td className="text-table">
                          {order.user && order.user.name}
                        </td>
                        <td className="text-table">{dateConvert}</td>

                        <td className="text-table">₹{order.totalPrice}</td>
                        <td>
                          {order.isPaid ? (
                            <span className="badge bg-gradient-success">
                              PAID
                            </span>
                          ) : (
                            <span className="badge bg-gradient-danger">
                              NOT PAID
                            </span>
                          )}
                        </td>

                        <td>
                          {order.isDelivered ? (
                            <span className="badge bg-gradient-success">
                              DELIVERED
                            </span>
                          ) : (
                            <span className="badge bg-gradient-danger">
                              NOT DELIVERED
                            </span>
                          )}
                        </td>

                        <td>
                          <LinkContainer
                            className="bg-gradient-dark button-view-details-tables"
                            to={`/admin/orders/${order._id}`}
                          >
                            <button className="bg-gradient-dark button-view-details-tables">
                              View Details
                            </button>
                          </LinkContainer>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card.Body>
          </Card>
        )}
      </Container>
    </>
  );
};

export default OrderListScreen;
