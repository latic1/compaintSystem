import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import User from "../models/userModel.js";
import Token from "../models/tokenModel.js";
import generateToken from "../utils/generateToken.js";

// @desc    Auth user & get token
// @route   POST /api/users/auth
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    generateToken(res, user._id);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: false,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc    Logout user / clear cookie
// @route   POST /api/users/logout
// @access  Public
const logoutUser = (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logged out successfully" });
};

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const requestPasswordReset = asyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.email });
  
    if (!user) {
      return res.status(404).json({ error: "User does not exist" });
    }
  
    let token = await Token.findOne({ userId: user._id });
    if (token) {
      await token.deleteOne();
    }
  
    let resetToken = crypto.randomBytes(32).toString("hex");
    const hash = await bcrypt.hash(resetToken, Number(bcryptSalt));
  
    await new Token({
      userId: user._id,
      token: hash,
      createdAt: Date.now(),
    }).save();
  
    const link = `${clientURL}/passwordReset?token=${resetToken}&id=${user._id}`;
    await sendEmail(
      user.email,
      "Password Reset Request",
      { name: user.name, link: link },
      "./template/requestResetPassword.handlebars"
    );
  
    return link;
  });
  
  const resetPassword = asyncHandler(async (req, res) => {
    let passwordResetToken = await Token.findOne({ userId: req.userId });
  
    if (!passwordResetToken) {
      return res.status(400).json({ error: "Invalid or expired password reset token" });
    }
  
    const isValid = await bcrypt.compare(req.body.token, passwordResetToken.token);
  
    if (!isValid) {
      return res.status(400).json({ error: "Invalid or expired password reset token" });
    }
  
    const hash = await bcrypt.hash(req.body.password, Number(bcryptSalt));
  
    const updatedUser = await User.findOneAndUpdate(
      { _id: req.userId },
      { $set: { password: hash } },
      { new: true }
    );
  
    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }
  
    sendEmail(
      updatedUser.email,
      "Password Reset Successfully",
      { name: updatedUser.name },
      "./template/resetPassword.handlebars"
    );
  
    await passwordResetToken.deleteOne();
  
    return res.status(200).json({ success: true });
  });
  

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  requestPasswordReset,
  resetPassword
};
