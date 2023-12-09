import express from "express";
const router = express.Router();
import {
    getAllUpload,
    getUpload,
    createUpload,
    deleteUpload,
} from "../controllers/uploadsController.js";

import { protect } from "../middleware/authMiddleware.js";

// Create an upload
router.post("/", protect, createUpload);

// Get All uploads belonging to a user
router.get("/", protect, getAllUpload);

// Get Single upload by ID
router.get("/:id", protect, getUpload);


// Delete upload by ID
router.delete("/:id", protect, deleteUpload);

export default router;
