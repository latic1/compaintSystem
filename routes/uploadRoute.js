import express from "express";
const router = express.Router();
import {
    getAllUpload,
    getUpload,
    updateUpload,
    createUpload,
    deleteUpload,
} from "../controllers/uploadsController.js";

import { protect } from "../middleware/authMiddleware.js";

// Create upload
router.post("/", protect, getAllUpload);

// Get All uploads
router.get("/", protect, getUpload);

// Get Single upload by ID
router.get("/:id", protect, updateUpload);

// Update upload by ID
router.put("/:id", protect, createUpload);

// Delete upload by ID
router.delete("/:id", protect, deleteUpload);

export default router;
