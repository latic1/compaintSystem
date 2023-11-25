import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

// @desc    Register a new admin
// @route   POST /api/users
// @access  Public
const registerAdmin = asyncHandler(async (req, res) => {
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
      isAdmin: true,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({ isAdmin: false,isVerified: true  }).select('-password');
  res.status(201).json(users);
});

export { registerAdmin, getAllUsers };
