import React, { useEffect } from "react";
import FeedbackCard from "../components/FeedbackCard";
import { useDispatch, useSelector } from "react-redux";
import { listFeedbacks } from "../actions/feedbackAction";
import Message from "../components/Message";
import Loader from "../components/Loader";

const FeedbackAdminScreen = () => {
  const feedbackList = useSelector((state) => state.feedbackList);
  const { feedbacks, loading, error } = feedbackList;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listFeedbacks());
  }, [dispatch]);

  console.log(feedbacks);

  return (
    <div className="container mt-5">
      <h3 className="headingstyles text-center">User Messages</h3>
      {loading && <Loader />}
      {error && <Message>{error}</Message>}
      <div className="row">
        {feedbacks.map((feedback) => (
          <div className="col-md-6 mt-5">
            <FeedbackCard feedback={feedback} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeedbackAdminScreen;
