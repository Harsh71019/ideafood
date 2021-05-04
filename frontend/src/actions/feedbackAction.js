import {
  USER_FEEDBACK_FAIL,
  USER_FEEDBACK_REQUEST,
  USER_FEEDBACK_SUCCESS,
  ADMIN_FEEDBACK_REQUEST,
  ADMIN_FEEDBACK_SUCCESS,
  ADMIN_FEEDBACK_FAIL,
} from "../constants/feedbackConstants";

import axios from "axios";
import { toast } from "react-toastify";

export const feedbackUser = (name, email, description) => async (dispatch) => {
  try {
    dispatch({
      type: USER_FEEDBACK_REQUEST,
    });

    const { data } = await axios.post(`/api/feedback`, {
      name,
      email,
      description,
    });

    toast.success(data.message);

    dispatch({
      type: USER_FEEDBACK_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_FEEDBACK_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
    toast.error(
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    );
  }
};

export const listFeedbacks = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: ADMIN_FEEDBACK_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/feedback`, config);

    dispatch({
      type: ADMIN_FEEDBACK_SUCCESS,
      payload: data,
    });

    
  } catch (error) {
    dispatch({
      type: ADMIN_FEEDBACK_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
