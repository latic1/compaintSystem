import express from "express";
const router = express.Router();
import {
  getAllCanvas,
  getCanvas,
  updateCanvas,
  createCanvas,
  deleteCanvas,
  shearCanvas,
} from "../controllers/canvasController.js";

import { protect } from "../middleware/authMiddleware.js";

// Create a new Canvas
router.post("/", protect, createCanvas);

// Get All Canvases
router.get("/", protect, getAllCanvas);

// Get Single Canvas by ID
router.get("/:id", protect, getCanvas);

// Update Canvas by ID
router.put("/:id", protect, updateCanvas);

// Delete Canvas by ID
router.delete("/:id", protect, deleteCanvas);

// shear Canvas by ID
router.get("/share/:id", shearCanvas);

export default router;
