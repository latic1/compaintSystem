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
router.post("/collaboration", protect, createCollaboration);

// Get All Collaborations
router.get("/collaboration", protect, getAllCollaboration);

// Get Single Collaboration by ID
router.get("/collaboration/:id", protect, getCollaboration);

// Update Collaboration by ID
router.put("/collaboration/:id", protect, updateCollaboration);

// Delete Collaboration by ID
router.delete("/collaboration/:id", protect, deleteCollaboration);

export default router;
