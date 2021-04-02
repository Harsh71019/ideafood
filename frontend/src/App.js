import React from "react";
import NavMain from "./components/NavMain";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen"
import { BrowserRouter as Router, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <NavMain />
      <Route path="/" component={HomeScreen} exact />
      <Route path='/product/:id' component={ProductScreen} />
      <Route path='/cart/:id?'  component={CartScreen} />
      <Footer />
    </Router>
  );
};

export default App;
