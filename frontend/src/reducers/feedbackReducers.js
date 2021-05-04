import {
  USER_FEEDBACK_FAIL,
  USER_FEEDBACK_REQUEST,
  USER_FEEDBACK_SUCCESS,
  ADMIN_FEEDBACK_REQUEST,
  ADMIN_FEEDBACK_SUCCESS,
  ADMIN_FEEDBACK_FAIL,
} from "../constants/feedbackConstants";

export const userFeedbackReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_FEEDBACK_REQUEST:
      return { loading: true };
    case USER_FEEDBACK_SUCCESS:
      return { loading: false, success: true, feedbackInfo: action.payload };
    case USER_FEEDBACK_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const feedbackListReducer = (state = { feedbacks: [] }, action) => {
  switch (action.type) {
    case ADMIN_FEEDBACK_REQUEST:
      return { loading: true, feedbacks: [] };
    case ADMIN_FEEDBACK_SUCCESS:
      return {
        loading: false,
        feedbacks: action.payload,
      };
    case ADMIN_FEEDBACK_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
