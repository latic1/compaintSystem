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
router.post("/canvases", protect, createCanvas);

// Get All Canvases
router.get("/canvases", protect, getAllCanvas);

// Get Single Canvas by ID
router.get("/canvases/:id", protect, getCanvas);

// Update Canvas by ID
router.put("/canvases/:id", protect, updateCanvas);

// Delete Canvas by ID
router.delete("/canvases/:id", protect, deleteCanvas);

export default router;
