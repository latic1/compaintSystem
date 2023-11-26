import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import crypto from "crypto";

import User from "../models/userModel.js";
import Token from "../models/tokenModel.js";
import generateToken from "../utils/generateToken.js";
import sendEmail from "../utils/email/sendEmail.js";
import verifyEmail from "../utils/email/verifyEmail.js";

const bcryptSalt = process.env.BCRYPT_SALT;

// @desc    Auth user & get token
// @route   POST /api/users/auth
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    res.status(401).json({ error: "Invalid email or password" });
    return;
  }

  // Check if the email is verified
  if (!user.isVerified) {
    res.status(401);
    throw new Error(
      "Email not verified. Please check your email for verification instructions."
    );
  }

  if (user && (await user.matchPassword(password))) {
    // const token = generateToken(res, user._id);
    const token = generateToken(user._id);

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      profilePicture: user.profilePicture,
      token:token
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

  // Check if the user already exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // Create a new user
  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    // Send the verification email
    await verifyEmail(user);

    res.status(201).json({
      success: true,
      message:
        "A link has been send to your email, please click on the link to verify your email.",
    });
  } else {
    console.error(error);
    res.status(400);
    throw new Error("Invalid user data");
  }
});

const verifyUser = asyncHandler(async (req, res) => {
  const verificationCode = req.params.token;
  try {
    if (!verificationCode) {
      return res.status(400).send("Invalid token111");
    }

    // Find the token based on the hashed code
    const token = await Token.findOne({ token: verificationCode });

    if (!token) {
      return res.status(400).send("Invalid token1");
    }

    // Check if the link has expired
    const expirationTime = 1 * 60 * 60 * 1000; // 1 hour
    const currentTime = new Date();

    if (currentTime - token.createdAt > expirationTime) {
      // Link has expired
      return res
        .status(400)
        .send("Verification link has expired. Please request a new one.");
    }

    // Find the user associated with the token
    const user = await User.findById(token.userId);

    if (!user) {
      return res.status(400).send("User not found");
    }

    // Update the user's verification status
    user.isVerified = true;

    await user.save();

    // Generate and send authentication token
    const authToken = generateToken(user._id);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      profilePicture: user.profilePicture,
      token: authToken,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
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
      profilePicture: user.profilePicture,
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
      profilePicture: updatedUser.profilePicture,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Request password reset
// @route   GET /api/users/requestPasswordReset
// @access  public
const requestPasswordReset = asyncHandler(async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ error: "User does not exist" });
    }

    let token = await Token.findOne({ userId: user._id });
    if (token) {
      await token.deleteOne();
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    const hash = await bcrypt.hash(resetToken, Number(process.env.BCRYPT_SALT));

    await new Token({
      userId: user._id,
      token: hash,
      createdAt: Date.now(),
    }).save();

    const link = `${process.env.CLIENT_URL}/passwordReset?token=${resetToken}&id=${user._id}`;
    await sendEmail(
      user.email,
      "Password Reset Request",
      { name: user.name, link: link },
      "./template/requestResetPassword.handlebars"
    );

    return res.status(200).json({
      success: true,
      message: "Password reset link sent successfully.",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

const resetPassword = asyncHandler(async (req, res) => {
  const { userId, password } = req.body;
  console.log(userId);

  let passwordResetToken = await Token.findOne({ userId: userId });

  if (!passwordResetToken) {
    return res
      .status(400)
      .json({ error: "Invalid or expired password reset token11" });
  }

  const isValid = await bcrypt.compare(
    req.body.token,
    passwordResetToken.token
  );

  if (!isValid) {
    return res
      .status(400)
      .json({ error: "Invalid or expired password reset token000" });
  }

  const hash = await bcrypt.hash(password, Number(bcryptSalt));

  const updatedUser = await User.findOneAndUpdate(
    { _id: userId },
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

  return res
    .status(200)
    .json({ success: true, message: "Password reset successful" });
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  requestPasswordReset,
  resetPassword,
  verifyUser,
};
