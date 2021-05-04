import React from "react";
import { Card } from "react-bootstrap";
import moment from "moment-timezone";

const FeedbackCard = ({ feedback }) => {
  return (
    <>
      <Card className="shadow-lg w-100 card-login">
        <Card.Body>
          <p>
            <i class="fas fa-portrait mr-2"></i>Name:&nbsp;{feedback.name}
          </p>
          <p>
            <i class="fas fa-envelope-open-text mr-2"></i>Email:&nbsp;
            {feedback.email}
          </p>
          <p>
            <i class="far fa-comments mr-2"></i>
            Feedback: &nbsp;{feedback.description}
          </p>
          <p className="mb-0">
          <i class="far fa-calendar-alt mr-2"></i>Time and Date: &nbsp;
            {moment(feedback.createdAt)
              .tz("Asia/Kolkata")
              .format("dddd, MMMM Do YYYY, hh:mm:ss a")}
          </p>
        </Card.Body>
      </Card>
    </>
  );
};

export default FeedbackCard;
