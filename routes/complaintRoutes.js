import express from "express";
import {
    newComplaint,
    getAllComplaints,
    getComplaint,
    UpdateComplaint,
    delateComplaint,
} from "../controllers/complaintController.js";

const router = express.Router();

// create a user
router.post("/", newComplaint);

// login a user
router.get("/", getAllComplaints);

//logout a user
router.get("/", getComplaint);

//get a user data
router.put("/", UpdateComplaint);

//update a user data
router.delete("/", delateComplaint);


export default router;
