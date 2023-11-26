import express from "express";
const router = express.Router();
import {
    getAllTemplate,
    getTemplate,
    updateTemplate,
    createTemplate,
    delateTemplate,
} from "../controllers/templateController.js";

import { protect } from "../middleware/authMiddleware.js";

// Create template
router.post("/templates", protect, createTemplate);

// Get All templates
router.get("/templates", protect, getAllTemplate);

// Get Single template by ID
router.get("/templates/:id", protect, getTemplate);

// Update template by ID
router.put("/templates/:id", protect, updateTemplate);

// Delete template by ID
router.delete("/templates/:id", protect, delateTemplate);

export default router;
