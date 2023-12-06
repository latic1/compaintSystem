import asyncHandler from "express-async-handler";
import Canvas from "../models/canvasModel.js";
import User from "../models/userModel.js";

// @desc    Get all canvases belonging to a particular user
// @route   GET /api/dashboard/canvases
// @access  Private
const getAllUserCanvas = asyncHandler(async (req, res) => {
    // Assuming you have a user ID in your user object
    const userId = req.params.id;
  
    try {
      // Find all canvases that belong to the user
      const userCanvases = await Canvas.find({ createdBy: userId });
  
      // Check if there are canvases
      if (userCanvases.length > 0) {
        res.json({ canvases: userCanvases });
      } else {
        res.status(404).json({ error: 'No canvases found for the user' });
      }
    } catch (error) {
      console.error('Error fetching user canvases:', error);
      res.status(500).json({ error: 'Server Error' });
    }
  });
  
  export { getAllUserCanvas };
  

  