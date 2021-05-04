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
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen";
import ProductListScreen from "./screens/ProductListScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import OrderListScreen from "./screens/OrderListScreen";
import OrderDetailsAdmin from "./screens/OrderDetailsAdmin";
import ForgotPassword from "./screens/ForgotPassword";
import ResetPasswordScreen from "./screens/ResetPasswordScreen";
import FeedbackAdminScreen from "./screens/FeedbackAdminScreen";
import DashboardAdmin from "./screens/DashboardAdmin"
import "./App.css";

const App = () => {
  return (
    <Router>
      <NavMain />
      <main>
        <Route path="/" component={HomeScreen} exact />
        <Route path="/page/:pageNumber" component={HomeScreen} exact />
        <Route
          path="/search/:keyword/page/:pageNumber"
          component={HomeScreen}
          exact
        />
        <Route
          path="/admin/productlist/:pageNumber"
          component={ProductListScreen}
          exact
        />

        <Route path="/search/:keyword" component={HomeScreen} exact />
        <Route path="/product/:id" component={ProductScreen} />
        <Route path="/cart/:id?" component={CartScreen} />
        <Route path="/login" component={LoginScreen} />
        <Route path="/register" component={RegisterScreen} />
        <Route path="/profile" component={ProfileScreen} />
        <Route path="/orders/:id" component={OrderScreen} />
        <Route path="/placeorder" component={PlaceOrderScreen} />
        <Route path="/shipping" component={ShippingScreen} />
        <Route path="/payment" component={PaymentScreen} />
        <Route path="/admin/userlist" component={UserListScreen} />
        <Route path="/admin/user/:id/edit" component={UserEditScreen} />
        <Route path="/admin/productlist" component={ProductListScreen} exact />
        <Route path="/admin/product/:id/edit" component={ProductEditScreen} />
        <Route path="/admin/orderlist" component={OrderListScreen} />
        <Route path="/admin/orders/:id" component={OrderDetailsAdmin} />
        <Route path="/forgot-password" component={ForgotPassword} />
        <Route path="/reset-password/:id" component={ResetPasswordScreen} />
        <Route path="/admin/feedback" component={FeedbackAdminScreen} />
        <Route path="/admin/dashboard" component={DashboardAdmin} />
      </main>
      <Footer />
    </Router>
  );
};

export default App;
