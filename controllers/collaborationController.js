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
    const collaborations = await Collaboration.find().populate("collaborators");
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
    const collaboration = await Collaboration.findById(req.params.id).populate("collaborators");
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

// @desc    Add a member to a collaboration
// @route   PUT /api/collaborations/:id/add-member
// @access  Private
const addMemberToCollaboration = asyncHandler(async (req, res) => {
  const { memberId } = req.body;

  try {
    const collaboration = await Collaboration.findById(req.params.id);

    if (!collaboration) {
      return res.status(404).json({ message: "Collaboration not found" });
    }

    // Check if the member is already in the collaborators array
    if (collaboration.collaborators.includes(memberId)) {
      return res.status(400).json({ message: "Member already exists in the collaboration" });
    }

    // Add the member to the collaborators array
    collaboration.collaborators.push(memberId);
    await collaboration.save();

    res.json(collaboration);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

// @desc    Remove a member from a collaboration
// @route   PUT /api/collaborations/:id/remove-member
// @access  Private
const removeMemberFromCollaboration = asyncHandler(async (req, res) => {
  const { memberId } = req.body;

  try {
    const collaboration = await Collaboration.findById(req.params.id);

    if (!collaboration) {
      return res.status(404).json({ message: "Collaboration not found" });
    }

    // Check if the member exists in the collaborators array
    if (!collaboration.collaborators.includes(memberId)) {
      return res.status(400).json({ message: "Member does not exist in the collaboration" });
    }

    // Remove the member from the collaborators array
    collaboration.collaborators = collaboration.collaborators.filter(id => id.toString() !== memberId);
    await collaboration.save();

    res.json(collaboration);
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
  addMemberToCollaboration,
  removeMemberFromCollaboration,
};
