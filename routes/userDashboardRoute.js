import express from "express";
const router = express.Router();
import {
  getAllUserCanvas,
  getAllUserCollaboration,
} from "../controllers/userDashboardController.js";

import { protect } from "../middleware/authMiddleware.js";

// Create Canvas
// router.post("/", protect, createCanvas);

// Get All Canvases
router.get("/canvas/:id", protect, getAllUserCanvas);

// Get All Collaborations belonging to a particular user
router.get("/collaboration/:id", protect, getAllUserCollaboration);

// Get Single Canvas by ID
// router.get("/:id", protect, getCanvas);

// Update Canvas by ID
// router.put("/:id", protect, updateCanvas);

// Delete Canvas by ID
// router.delete("/:id", protect, deleteCanvas);

export default router;
