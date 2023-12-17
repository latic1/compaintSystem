import express from "express";
const router = express.Router();
import {
  createCollaboration,
  getAllCollaboration,
  getCollaboration,
  updateCollaboration,
  deleteCollaboration,
} from "../controllers/collaborationController.js";
import { protect } from "../middleware/authMiddleware.js";

// Create Collaboration
router.post("", protect, createCollaboration);

// Get All Collaborations
router.get("", protect, getAllCollaboration);

// Get Single Collaboration by ID
router.get("/:id", protect, getCollaboration);

// Update Collaboration by ID
router.put("/:id", protect, updateCollaboration);

// Delete Collaboration by ID
router.delete("/:id", protect, deleteCollaboration);

export default router;
