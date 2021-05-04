import Feedback from "../models/feedBackModel.js";
import asyncHandler from "express-async-handler";

//@desc POST all users feedback
//@routes POST /api/feedback
// @access Open to All

const feedbackPost = asyncHandler(async (req, res) => {
  const { name, email, description } = req.body;

  const feedback = await Feedback.create({
    name,
    email,
    description,
  });

  if (feedback) {
    res.status(201).json({
      message: "Thank You For Your Message We Will Contact You ASAP!",
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

//@desc Get all users feedback
//@routes GET /api/feedback
// @access Private/Admin

const getFeedback = asyncHandler(async (req, res) => {
  const feedback = await Feedback.find({}).sort({ _id: -1 });
  res.json(feedback);
});

export { feedbackPost, getFeedback };
