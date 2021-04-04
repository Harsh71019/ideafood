import React from "react";
import NavMain from "./components/NavMain";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import { BrowserRouter as Router, Route } from "react-router-dom";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";

const App = () => {
  return (
    <Router>
      <NavMain />
      <Route path="/" component={HomeScreen} exact />
      <Route path="/product/:id" component={ProductScreen} />
      <Route path="/cart/:id?" component={CartScreen} />
      <Route path="/login" component={LoginScreen} />
      <Route path="/register" component={RegisterScreen} />
      <Route path="/profile" component={ProfileScreen} />
      <Route path="/orders/:id" component={OrderScreen} />
      <Route path="/placeorder" component={PlaceOrderScreen} />
      <Route path="/shipping" component={ShippingScreen} />
      <Route path="/payment" component={PaymentScreen} /> 
      <Footer />
    </Router>
  );
};

export default App;
