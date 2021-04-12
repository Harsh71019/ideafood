import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import NavDropdown from "react-bootstrap/NavDropdown";
import FormControl from "react-bootstrap/FormControl";
import Container from "react-bootstrap/Container";
import "../styles/nav.styles.css";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/userActions";
import { Route } from "react-router-dom";
import SearchBox from "./SearchBox";

const NavMain = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);

  const { userInfo } = userLogin;

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <header className="marginbotttom-main">
      <Navbar className="main-nav" fixed="top" collapseOnSelect expand="md">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand className="nav-font-styles">Your Logo</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Route render={({ history }) => <SearchBox history={history} />} />
            <Nav className="ml-auto">
              <LinkContainer className="nav-font-styles" to="/">
                <Nav.Link>Home</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/cart">
                <Nav.Link className="nav-font-styles">
                  <i className="fa fa-shopping-cart"></i> Cart &nbsp;({cartItems.length})
                </Nav.Link>
              </LinkContainer>
              {userInfo ? (
                <NavDropdown title={userInfo.name} id="username">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <>
                  <LinkContainer to="/login">
                    <Nav.Link className="nav-font-styles">
                      <i className="fa fa-sign-in-alt"></i> Login
                    </Nav.Link>
                  </LinkContainer>
                  {/* <LinkContainer to="/register">
                    <Nav.Link>
                      <i className="fa fa-user-plus mr-1"></i>Sign-Up
                    </Nav.Link>
                  </LinkContainer> */}
                </>
              )}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown
                  className="nav-font-styles"
                  title="Admin"
                  id="adminmenu"
                >
                  <LinkContainer to="/admin/userlist">
                    <NavDropdown.Item className="nav-font-styles">
                      Users
                    </NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/productlist">
                    <NavDropdown.Item className="nav-font-styles">
                      Manage Product
                    </NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/orderlist">
                    <NavDropdown.Item className="nav-font-styles">
                      Orders
                    </NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default NavMain;
