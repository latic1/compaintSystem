import express from "express";
import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  requestPasswordReset,
  resetPassword,
  verifyUser,
  verifyToken,
  changePassword
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// create a user
router.post("/", registerUser);

// login a user
router.post("/login", authUser);

//logout a user
router.post("/logout", logoutUser);

//get a user data
router.get("/profile", protect, getUserProfile);

//update a user data
router.put("/profile", protect, updateUserProfile);

//send rest password link by mail
router.post("/requestPasswordReset", requestPasswordReset);

//reset user password
router.post("/resetPassword", resetPassword);

//change user password
router.post("/change-password", changePassword);

// send email verification link by mail
router.get("/verify-email/:token", verifyUser);

router.get("/verify-token/:token",verifyToken);


export default router;
