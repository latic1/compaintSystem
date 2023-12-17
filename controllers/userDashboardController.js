import asyncHandler from "express-async-handler";
import Canvas from "../models/canvasModel.js";
import Collaboration from "../models/collaborationModel.js";

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



// @desc    Get all collaboration belonging to a particular user
// @route   GET /api/dashboard/collaboration
// @access  Private
  const getAllUserCollaboration =asyncHandler(async(req,res)=>{
    const userId = req.params.id;
    try {
      const collaborations =await Collaboration.find({ createdBy: userId });

      if (collaborations.length>0){
        res.json({data:collaborations});
      }else{
        res.status(404).json({error:'No collaboration found for user'})
      }
    } catch (error) {
      console.error(error);
      res.status(500);
      throw new Error('server error')
    }
  })
  
  export { getAllUserCanvas,getAllUserCollaboration };
  


  