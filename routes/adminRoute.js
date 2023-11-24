import express from "express";
import { registerAdmin, getAllUsers } from "../controllers/adminController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerAdmin);
router.get('/get-all-users', protect, getAllUsers);

export default router;
