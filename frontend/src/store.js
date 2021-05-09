import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productListReducer,
  productDetailsReducer,
  productDeleteReducer,
  productCreateReducer,
  productUpdateReducer,
  productReviewCreateReducer,
} from "./reducers/productReducers";
import { cartReducer } from "./reducers/cartReducers";
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateReducer,
  forgotPasswordReducer,
  resetPasswordReducer,
  userGoogleReducer,
} from "./reducers/userReducers";
import {
  orderCreateReducer,
  ordersDetailsReducer,
  orderPayReducer,
  orderListMyReducer,
  orderListReducer,
  orderRecieveReducer,
  orderTransitReducer,
  orderDeliverReducer,
  razorPayReducer,
} from "./reducers/orderReducers";

import {
  userFeedbackReducer,
  feedbackListReducer,
} from "./reducers/feedbackReducers";

import {
  dashBoardTotalProductsReducer,
  dashBoardTotalUsersReducer,
  dashBoardTotalSalesReducer,
  dashBoardTotalOrdersReducer,
  adminSalesGraphReducer,
} from "./reducers/dashBoardReducers";

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  productDelete: productDeleteReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  productReviewCreate: productReviewCreateReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  userGoogle: userGoogleReducer,
  orderCreate: orderCreateReducer,
  orderDetails: ordersDetailsReducer,
  orderPay: orderPayReducer,
  orderListMy: orderListMyReducer,
  orderList: orderListReducer,
  orderRecieve: orderRecieveReducer,
  orderTransit: orderTransitReducer,
  orderDeliver: orderDeliverReducer,
  forgotPassword: forgotPasswordReducer,
  resetPassword: resetPasswordReducer,
  razorPay: razorPayReducer,
  userFeedback: userFeedbackReducer,
  feedbackList: feedbackListReducer,
  totalProducts: dashBoardTotalProductsReducer,
  totalOrders: dashBoardTotalOrdersReducer,
  totalSales: dashBoardTotalSalesReducer,
  totalUsers: dashBoardTotalUsersReducer,
  adminSalesGraph: adminSalesGraphReducer,
});

const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const shippingAddressFromStorage = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : {};

const paymentMethodFromStorage = localStorage.getItem("paymentMethod")
  ? JSON.parse(localStorage.getItem("paymentMethod"))
  : {};

const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
    paymentMethod: paymentMethodFromStorage,
  },
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
