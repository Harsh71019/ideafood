import React, { useEffect } from "react";
import { Button, Table, Container, Card } from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import SideNavDashBoard from "../components/SideNavDashBoard";
import { LinkContainer } from "react-router-bootstrap";
import { listUsers, deleteUser } from "../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import "../styles/tables.styles.css";
import AdminDashboardNav from "../components/AdminDashboardNav";

const UserListScreen = ({ history }) => {
  const dispatch = useDispatch();

  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDelete = useSelector((state) => state.userDelete);
  const { success: successDelete } = userDelete;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers());
    } else {
      history.push("/login");
    }
  }, [dispatch, history, userInfo, successDelete]);

  const deleteHandler = (id) => {
    if (
      window.confirm(
        "Are you sure you want to delete this user ? (This cannot be undone!)"
      )
    ) {
      dispatch(deleteUser(id));
    }
  };

  return (
    <>
      <div className="container">
        <AdminDashboardNav />
        {loading ? (
          <Loader />
        ) : error ? (
          <Message>{error}</Message>
        ) : (
          <Card className="card-login w-100 table-card-border shadow-lg">
            <Card.Body className="px-0 pt-0 pb-2">
              <h3 className="headingstyles text-center mt-3 mb-3">
                All Customers Data
              </h3>
              <div class="table-responsive p-0">
                <table className="table align-items-center mb-0">
                  <thead>
                    <tr>
                      <th className="th-border-none fontstylesth">ID</th>
                      <th className="th-border-none fontstylesth">NAME</th>
                      <th className="th-border-none fontstylesth">EMAIL</th>
                      <th className="th-border-none fontstylesth">MOBILE</th>
                      <th className="th-border-none fontstylesth">ADMIN</th>
                      <th className="th-border-none fontstylesth">EDIT</th>
                      <th className="th-border-none fontstylesth">DELETE</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users &&
                      users.map((user) => (
                        <tr key={user._id}>
                          <td className="text-table">{user._id}</td>
                          <td className="text-table">{user.name}</td>
                          <td className="text-table">
                            <a
                              className="td-email"
                              href={`mailto:${user.email}`}
                            >
                              {" "}
                              {user.email}{" "}
                            </a>
                          </td>
                          <td className="text-table">
                            <a
                              className="td-mobile"
                              href={`tel:${user.mobile}`}
                            >
                              {" "}
                              {user.mobile}{" "}
                            </a>
                          </td>
                          <td>
                            {user.isAdmin ? (
                              <span className="badge bg-gradient-success">
                                ADMIN
                              </span>
                            ) : (
                              <span className="badge bg-gradient-danger">
                                NOT ADMIN
                              </span>
                            )}
                          </td>
                          <td>
                            <LinkContainer to={`/admin/user/${user._id}/edit`}>
                              <a className="edit-button-tables">
                                <i class="fas fa-pencil-alt mr-2"></i> Edit
                              </a>
                            </LinkContainer>
                          </td>
                          <td>
                            <a
                              className="delete-button-tables"
                              onClick={() => deleteHandler(user._id)}
                            >
                              <i class="far fa-trash-alt mr-2"></i>
                              Delete
                            </a>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </Card.Body>
          </Card>
        )}
      </div>
    </>
  );
};

export default UserListScreen;
