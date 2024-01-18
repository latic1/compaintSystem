import express from "express";
import {
  newComplaint,
  getAllComplaints,
  getComplaint,
  updateComplaint,
  deleteComplaint,
} from "../controllers/complaintController.js";

const router = express.Router();

// Create a new complaint
router.post("/", newComplaint);

// Get all complaints
router.get("/", getAllComplaints);

// Get a single complaint by ID
router.get("/:id", getComplaint);

// Update a complaint by ID
router.put("/:id", updateComplaint);

// Delete a complaint by ID
router.delete("/:id", deleteComplaint);

export default router;
