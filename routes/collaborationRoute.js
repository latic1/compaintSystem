import express from "express";
const router = express.Router();
import {
  createCollaboration,
  getAllCollaboration,
  getCollaboration,
  updateCollaboration,
  deleteCollaboration,
  addMemberToCollaboration,
  removeMemberFromCollaboration,
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

//add member to collaboration by ID 
router.put("/:id/add-member", protect, addMemberToCollaboration);

//remove member from collaboration by ID
router.put("/:id/remove-member", protect, removeMemberFromCollaboration);

export default router;
