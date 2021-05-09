import {
  TOTAL_SALE_REQUEST,
  TOTAL_SALE_SUCCESS,
  TOTAL_SALE_FAIL,
  TOTAL_PRODUCTS_REQUEST,
  TOTAL_PRODUCTS_SUCCESS,
  TOTAL_PRODUCTS_FAIL,
  TOTAL_USERS_REQUEST,
  TOTAL_USERS_SUCCESS,
  TOTAL_USERS_FAIL,
  TOTAL_ORDERS_REQUEST,
  TOTAL_ORDERS_SUCCESS,
  TOTAL_ORDERS_FAIL,
  DASHBOARD_SALES_GRAPH_REQUEST,
  DASHBOARD_SALES_GRAPH_SUCCESS,
  DASHBOARD_SALES_GRAPH_FAIL,
} from "../constants/dashboardConstants";

export const dashBoardTotalSalesReducer = (state = {}, action) => {
  switch (action.type) {
    case TOTAL_SALE_REQUEST:
      return { loading: true };
    case TOTAL_SALE_SUCCESS:
      return { loading: false, totalSalesRupees: action.payload };
    case TOTAL_SALE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const dashBoardTotalProductsReducer = (state = {}, action) => {
  switch (action.type) {
    case TOTAL_PRODUCTS_REQUEST:
      return { loading: true };
    case TOTAL_PRODUCTS_SUCCESS:
      return { loading: false, totalProductsCount: action.payload };
    case TOTAL_PRODUCTS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const dashBoardTotalUsersReducer = (state = {}, action) => {
  switch (action.type) {
    case TOTAL_USERS_REQUEST:
      return { loading: true };
    case TOTAL_USERS_SUCCESS:
      return { loading: false, totalUsersCount: action.payload };
    case TOTAL_USERS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const dashBoardTotalOrdersReducer = (state = {}, action) => {
  switch (action.type) {
    case TOTAL_ORDERS_REQUEST:
      return { loading: true };
    case TOTAL_ORDERS_SUCCESS:
      return { loading: false, totalOrdersCount: action.payload };
    case TOTAL_ORDERS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const adminSalesGraphReducer = (state = { salesgraph: [] }, action) => {
  switch (action.type) {
    case DASHBOARD_SALES_GRAPH_REQUEST:
      return { loading: true, salesgraph: [] };
    case DASHBOARD_SALES_GRAPH_SUCCESS:
      return {
        loading: false,
        salesgraph: action.payload,
      };
    case DASHBOARD_SALES_GRAPH_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
