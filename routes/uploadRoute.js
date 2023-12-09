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

// Create Canvas
router.post("/", protect, getAllUpload);

// Get All Canvases
router.get("/", protect, getUpload);

// Get Single Canvas by ID
router.get("/:id", protect, updateUpload);

// Update Canvas by ID
router.put("/:id", protect, createUpload);

// Delete Canvas by ID
router.delete("/:id", protect, deleteUpload);

export default router;
