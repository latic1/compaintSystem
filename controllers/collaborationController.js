import Collaboration from "../models/collaborationModel.js";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

// @desc    Create a new collaboration
// @route   POST /api/collaborations
// @access  Private
const createCollaboration = asyncHandler(async (req, res) => {
  try {
    const { canvasId, collaborators } = req.body;
    const newCollaboration = await Collaboration.create({
      canvasId,
      createdBy:req.user.id,
      collaborators,
    });
    res.status(201).json(newCollaboration);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

// @desc    Get all collaboration
// @route   GET /api/collaborations
// @access  Private
const getAllCollaboration = asyncHandler(async (req, res) => {
  try {
    const collaborations = await Collaboration.find();
    res.json(collaborations);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

// @desc    Get a collaboration by ID
// @route   GET /api/collaborations/:id
// @access  Private
const getCollaboration = asyncHandler(async (req, res) => {
  try {
    const collaboration = await Collaboration.findById(req.params.id);
    if (!collaboration) {
      return res.status(404).json({ message: "Collaboration not found" });
    }
    res.json(collaboration);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

// @desc    Update a collaboration
// @route   PUT /api/collaborations/:id
// @access  Private

const updateCollaboration = asyncHandler(async (req, res) => {
  try {
    const { canvasId, collaborators } = req.body;

 
    const collaboration = await Collaboration.findById(req.user.id);
    const user = await User.findById(req.user.id);

    // check for user and canvas existence
    if (!user || !collaboration) {
      res.status(401);
      throw new Error("User or collaboration not found");
    }
  
    // make sure only the authenticated user created this canvas
    if (collaboration.user.toString() !== req.user.id) {
      res.status(401);
      throw new Error("User not authorized");
    }

    const updatedCollaboration = await Collaboration.findByIdAndUpdate(
      req.params.id,
      { canvasId, collaborators },
      { new: true }
    );

    if (!updatedCollaboration) {
      return res.status(404).json({ message: "Collaboration not found" });
    }

    res.json(updatedCollaboration);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});


// @desc    Delete a collaboration
// @route   DELETE /api/collaborations/:id
// @access  Private
const deleteCollaboration = asyncHandler(async (req, res) => {
  try {
    const collaboration = await Collaboration.findById(req.user.id);
    const user = await User.findById(req.user.id);

    // check for user and canvas existence
    if (!user || !collaboration) {
      res.status(401);
      throw new Error("User or collaboration not found");
    }
  
    // make sure only the authenticated user created this canvas
    if (collaboration.user.toString() !== req.user.id) {
      res.status(401);
      throw new Error("User not authorized");
    }
    const deletedCollaboration = await Collaboration.findByIdAndDelete(
      req.params.id
    );
    if (!deletedCollaboration) {
      return res.status(404).json({ message: "Collaboration not found" });
    }
    res.json({ message: "Collaboration deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

export {
  createCollaboration,
  getAllCollaboration,
  getCollaboration,
  updateCollaboration,
  deleteCollaboration,
};
