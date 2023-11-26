import express from "express";
import { registerAdmin, getAllUsers } from "../controllers/adminController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();


//register a new admin
router.post("/register", registerAdmin);

//get all users data
router.get('/get-all-users', protect, getAllUsers);

export default router;
