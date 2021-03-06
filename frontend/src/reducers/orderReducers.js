import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_REQUEST,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_PAY_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_RESET,
  ORDER_LIST_MY_REQUEST,
  ORDER_LIST_MY_SUCCESS,
  ORDER_LIST_MY_FAIL,
  ORDER_LIST_MY_RESET,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_LIST_RESET,
  ORDER_DELIVER_REQUEST,
  ORDER_DELIVER_SUCCESS,
  ORDER_DELIVER_FAIL,
  ORDER_DELIVER_RESET,
  RAZOR_ORDER_FAIL,
  RAZOR_ORDER_SUCCESS,
  RAZOR_ORDER_REQUEST,
  ORDER_RECEIVE_REQUEST,
  ORDER_RECEIVE_SUCCESS,
  ORDER_RECEIVE_FAIL,
  ORDER_RECEIVE_RESET,
  ORDER_TRANSIT_REQUEST,
  ORDER_TRANSIT_SUCCESS,
  ORDER_TRANSIT_FAIL,
  ORDER_TRANSIT_RESET,
} from "../constants/orderConstants";
import { USER_DETAILS_RESET } from "../constants/userConstants";

export const orderCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_CREATE_REQUEST:
      return {
        loading: true,
      };

    case ORDER_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        order: action.payload,
      };

    case ORDER_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const ordersDetailsReducer = (
  state = { loading: true, orderItems: [], shippingAddress: {} },
  action
) => {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case ORDER_DETAILS_SUCCESS:
      return {
        loading: false,
        order: action.payload,
      };

    case ORDER_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const orderPayReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_PAY_REQUEST:
      return {
        loading: true,
      };

    case ORDER_PAY_SUCCESS:
      return {
        loading: false,
        success: true,
      };

    case ORDER_PAY_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case ORDER_PAY_RESET:
      return {};

    default:
      return state;
  }
};

export const orderListMyReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ORDER_LIST_MY_REQUEST:
      return {
        loading: true,
      };

    case ORDER_LIST_MY_SUCCESS:
      return {
        loading: false,
        orders: action.payload,
      };

    case ORDER_LIST_MY_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case ORDER_LIST_MY_RESET:
      return { orders: [] };
    default:
      return state;
  }
};

export const orderListReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ORDER_LIST_REQUEST:
      return { ...state, loading: true };
    case ORDER_LIST_SUCCESS:
      return { loading: false, orders: action.payload };
    case ORDER_LIST_FAIL:
      return { loading: false, error: action.payload };
    case ORDER_LIST_RESET:
      return { orders: [] };
    default:
      return state;
  }
};

export const orderDeliverReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_DELIVER_REQUEST:
      return {
        loading: true,
      };

    case ORDER_DELIVER_SUCCESS:
      return {
        loading: false,
        success: true,
      };

    case ORDER_DELIVER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case ORDER_DELIVER_RESET:
      return {};

    default:
      return state;
  }
};
export const orderRecieveReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_RECEIVE_REQUEST:
      return {
        loading: true,
      };

    case ORDER_RECEIVE_SUCCESS:
      return {
        loading: false,
        success: true,
      };

    case ORDER_RECEIVE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case ORDER_RECEIVE_RESET:
      return {};

    default:
      return state;
  }
};
export const orderTransitReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_TRANSIT_REQUEST:
      return {
        loading: true,
      };

    case ORDER_TRANSIT_SUCCESS:
      return {
        loading: false,
        success: true,
      };

    case ORDER_TRANSIT_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case ORDER_TRANSIT_RESET:
      return {};

    default:
      return state;
  }
};

export const razorPayReducer = (state = {}, action) => {
  switch (action.type) {
    case RAZOR_ORDER_REQUEST:
      return { loading: true };
    case RAZOR_ORDER_SUCCESS:
      return { loading: false, paySuccess: action.payload, success: true };
    case RAZOR_ORDER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
