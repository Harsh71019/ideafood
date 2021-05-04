import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import OTP from "../models/otpModel.js";
import generateToken from "../utils/generateToken.js";
import resetToken from "../utils/resetToken.js";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";

//@desc Auth user and get token
//@routes GET /api/users/login
// @access Public

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPasswords(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      mobile: user.mobile,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

//@desc Register a new user
//@routes GET /api/users
// @access Public

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, mobile, password } = req.body;

  const userExist = await User.findOne({ email });

  if (userExist) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    mobile,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      mobile: user.mobile,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

//@desc Get user profile
//@routes GET /api/users/profile
// @access Private

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      mobile: user.mobile,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error("User not found");
  }
});

//@desc update user profile
//@routes PUT /api/users/profile
// @access Private

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.mobile = req.body.mobile || user.mobile;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();
    res.status(201).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      mobile: updatedUser.mobile,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(401);
    throw new Error("User not found");
  }
});

//@desc Get all users
//@routes GET /api/users
// @access Private/Admin

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

//@desc Delete User
//@routes GET /api/users/:id
// @access Private/Admin

const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    await user.remove();
    res.json({ message: "User deleted" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

//@desc Get user by ID
//@routes GET /api/users/:id
// @access Private/Admin

const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

//@desc update user
//@routes PUT /api/users/:id
// @access Private/Admin

const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.mobile = req.body.mobile || user.mobile;
    user.isAdmin = req.body.isAdmin;

    const updatedUser = await user.save();

    res.status(201).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      mobile: updatedUser.mobile,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error("User not found");
  }
});

//@desc Forgot Password Functionality
//@routes PUT /api/users/forgot-password
// @access

const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    res.status(400);
    throw new Error("User not Found Please Register");
  }
  // User.findOne({ email }, (err, user) => {
  //   if (err || !user) {
  //     res.status(400);
  //     throw new Error("User not Found Please Register");
  //   }
  // });

  const token = resetToken(user._id);

  let transporter = nodemailer.createTransport({
    // host: "smtp://booking@fordind.com",
    // port: process.env.EMAIL_PORT,
    // secure: true,
    service: "gmail",
    auth: {
      user: process.env.USER_EMAIL,
      pass: process.env.USER_EMAIL_PASSWORD,
    },
  });

  var mailOptions = {
    from: process.env.USER_EMAIL,
    to: email,
    subject: "Link for Password Reset",
    html: `<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
    <html lang="en">
    <head>
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1"> <!-- So that mobile will display zoomed in -->
      <meta http-equiv="X-UA-Compatible" content="IE=edge"> <!-- enable media queries for windows phone 8 -->
      <meta name="format-detection" content="telephone=no"> <!-- disable auto telephone linking in iOS -->
      <title>Reset Password</title>
    </head>
    
    <body style="margin:0; padding:0;" bgcolor="#F0F0F0" leftmargin="0" topmargin="0" marginwidth="0" marginheight="0">
        <h1>Please Click On The Link To Reset Password </h1>
        <p> http://localhost:3000/reset-password/${token} </p>
    </body>
    </html>
    `,
  };

  return user.updateOne({ resetLink: token }, (err, success) => {
    if (err) {
      res.status(400);
      throw new Error("Generate Link Failed");
    } else {
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return console.log(error);
        } else {
          console.log("Message sent: %s", info.messageId);
          console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
          return res.json({
            message: "Email Successfully sent kindly follow the instructions",
          });
        }
      });
    }
  });
});

//@desc Forgot Password Functionality
//@routes PUT /api/users/forgot-password
// @access

const resetPassword = asyncHandler(async (req, res) => {
  const { resetLink, newPassword } = req.body;

  if (resetLink) {
    jwt.verify(
      resetLink,
      process.env.JWT_SECRET_RESET,
      async function (error, decodedData) {
        if (error) {
          return res.status(401).json({
            error: "Incorrect Token or it is expired",
          });
        }
        const user = await User.findOne({ resetLink });
        if (user) {
          if (newPassword) {
            user.password = newPassword;
          }

          const updatedUser = await user.save();
          res.status(201).json({
            message: "Password Reset Success!",
          });
        }
      }
    );
  } else {
    res.status(401);
    throw new Error("Auth Failed");
  }
});

export {
  updateUser,
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  forgotPassword,
  resetPassword,
};
