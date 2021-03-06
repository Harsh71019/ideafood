import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
  ListGroupItem,
  Container,
} from "react-bootstrap";
import { addToCart, removeFromCart } from "../actions/cartActions";
import "../styles/cart.styles.css";

const CartScreen = ({ match, location, history }) => {
  const productId = match.params.id;
  const qty = location.search ? Number(location.search.split("=")[1]) : 1;

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  console.log(cart);

  console.log(cartItems);

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    history.push("/login?redirect=shipping");
  };

  return (
    <Container className="">
      <h3 className="headingstyles text-center">Cart</h3>
      <Row>
        <Col md={8}>
          {cartItems.length === 0 ? (
            <Message>
              Your Cart is Empty <Link to="/"> Go Back </Link>
            </Message>
          ) : (
            <ListGroup variant="flush" className="mt-2">
              {cartItems.map((item) => (
                <Card
                  key={item.product}
                  className="card-login shadow-lg mt-2 w-100"
                >
                  <Card.Body className="w-100">
                    <Row className="w-100">
                      <Col xs={2} md={2}>
                        <div className="cart-image-container">
                          <Image
                            src={item.image}
                            alt={item.name}
                            className="image-cart"
                          />
                        </div>
                      </Col>
                      <Col
                        md={4}
                        xs={4}
                        className="d-flex align-items-center justify-content-center"
                      >
                        <Link
                          className="cart-product-link"
                          to={`/product/${item.product}`}
                        >
                          {item.name}
                        </Link>
                      </Col>
                      <Col
                        md={2}
                        xs={2}
                        className="d-flex align-items-center justify-content-center cart-price-link"
                      >
                        ???{item.price}
                      </Col>
                      <Col
                        md={2}
                        xs={2}
                        className="d-flex align-items-center justify-content-center"
                      >
                        <Form.Control
                          as="select"
                          value={item.qty}
                          className="w-100 d-flex align-items-center"
                          onChange={(e) =>
                            dispatch(
                              addToCart(item.product, Number(e.target.value))
                            )
                          }
                        >
                          {[...Array(item.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                      <Col
                        md={2}
                        xs={2}
                        className="px-0 d-flex align-items-center justify-content-end"
                      >
                        <a
                          className="d-flex align-items-center px-0 cart-delete-button"
                          onClick={() => removeFromCartHandler(item.product)}
                        >
                          <i className="far fa-trash-alt cart-delete-icon"></i>
                        </a>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4} sm={12}>
          <Card className="card-login mt-3 shadow-lg">
            <Card.Body>
              <h6 className="cart-subtotal-text">
                Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                items
              </h6>
              <hr></hr>
              <h6 className="cart-subtotal-price-link">
                ???
                {cartItems
                  .reduce((acc, item) => acc + item.qty * item.price, 0)
                  .toFixed(2)}
              </h6>

              {userInfo && userInfo.isAdmin ? (
                <>Admin cannot order</>
              ) : (
                <Button
                  className="btn-grad mt-3"
                  disabled={cartItems.length === 0}
                  onClick={checkoutHandler}
                >
                  Checkout
                </Button>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
      {/* <Row className="mt-5">
        <Col md={8}>
          <h3>Cart</h3>
          {cartItems.length === 0 ? (
            <Message>
              Your cart is empty <Link to="/">Go back</Link>{" "}
            </Message>
          ) : (
            <ListGroup variant="flush">
              {cartItems.map((item) => (
                <ListGroupItem key={item.product}>
                  <Row>
                    <Col md={2}>
                      <Image src={item.image} alt={item.name} fluid rounded />
                    </Col>
                    <Col md={3}>
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </Col>
                    <Col md={2}>??? {item.price}</Col>
                    <Col md={2}>
                      <Form.Control
                        as="select"
                        value={item.qty}
                        onChange={(e) =>
                          dispatch(addToCart(item.product, e.target.value))
                        }
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                    <Col md={2}>
                      <Button
                        onClick={() => {
                          removeFromCartHandler(item.product);
                        }}
                        type="button"
                        variant="light"
                      >
                        <i className="fa fa-trash"></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroupItem>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroupItem>
                <h5>
                  Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}
                  ) items
                </h5>
              </ListGroupItem>
            </ListGroup>
          </Card>
        </Col>
      </Row> */}
    </Container>
  );
};

export default CartScreen;
