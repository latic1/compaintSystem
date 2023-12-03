import express from "express";
const router = express.Router();
import {
  getAllCanvas,
  getCanvas,
  updateCanvas,
  createCanvas,
  deleteCanvas,
} from "../controllers/canvasController.js";

import { protect } from "../middleware/authMiddleware.js";

// Create Canvas
router.post("/", protect, createCanvas);

// Get All Canvases
router.get("/", protect, getAllCanvas);

// Get Single Canvas by ID
router.get("/:id", protect, getCanvas);

// Update Canvas by ID
router.put("/:id", protect, updateCanvas);

// Delete Canvas by ID
router.delete("/:id", protect, deleteCanvas);

export default router;