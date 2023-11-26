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
router.post("/uploads", protect, getAllUpload);

// Get All Canvases
router.get("/uploads", protect, getUpload);

// Get Single Canvas by ID
router.get("/uploads/:id", protect, updateUpload);

// Update Canvas by ID
router.put("/uploads/:id", protect, createUpload);

// Delete Canvas by ID
router.delete("/uploads/:id", protect, deleteUpload);

export default router;
