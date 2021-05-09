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
import axios from "axios";

export const getTotalSalesActions = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: TOTAL_SALE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(
      `/api/orders/getorders/totalsales`,
      config
    );

    dispatch({
      type: TOTAL_SALE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TOTAL_SALE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getTotalOrdersActions = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: TOTAL_ORDERS_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(
      `/api/orders/getordercount/orders`,
      config
    );

    dispatch({
      type: TOTAL_ORDERS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TOTAL_ORDERS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getTotalUsersActions = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: TOTAL_USERS_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/users/getusercount`, config);

    dispatch({
      type: TOTAL_USERS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TOTAL_USERS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getTotalProductsActions = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: TOTAL_PRODUCTS_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/products/getproductcount`, config);

    dispatch({
      type: TOTAL_PRODUCTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TOTAL_PRODUCTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const adminSalesGraphActions = () => async (dispatch) => {
  try {
    dispatch({
      type: DASHBOARD_SALES_GRAPH_REQUEST,
    });

    const { data } = await axios.get(`/api/orders/total/orders/day`);

    dispatch({
      type: DASHBOARD_SALES_GRAPH_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DASHBOARD_SALES_GRAPH_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
