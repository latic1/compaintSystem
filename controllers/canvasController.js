import asyncHandler from "express-async-handler";
import Canvas from "../models/canvasModel.js";
import User from "../models/userModel.js";

// @desc    Get all canvas
// @route   GET /api/canvases
// @access  Private
const getAllCanvas = asyncHandler(async (req, res) => {
  const canvases = await Canvas.find();
  if (canvases) {
    res.json(canvases);
  } else {
    console.error(error);
    res.status(500);
    throw new Error("Server Error");
  }
});

// @desc    Get a canvas by id
// @route   GET /api/canvas/:id
// @access  Private
const getCanvas = asyncHandler(async (req, res) => {
  try {
    const canvas = await Canvas.findById(req.params.id);
    if (!canvas) {
      return res.status(404).json({ message: "Canvas not found" });
    }
    res.json(canvas);
  } catch (error) {
    console.error(error);
    res.status(500);
    throw new Error("Server Error");
  }
});

// @desc    Update a canvas
// @route   PUT /api/canvases/:id
// @access  Private
const updateCanvas = asyncHandler(async (req, res) => {
  const { title, description, content } = req.body;
  const canvas = await Canvas.findById(req.params.id);

  const user = await User.findById(req.user.id);

  // check for user and canvas existence
  if (!user || !canvas) {
    res.status(401);
    throw new Error("User or Canvas not found");
  }

  // make sure only the authenticated user created this canvas
  console.log(canvas);
  if (canvas.createdBy.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const updatedCanvas = await Canvas.findByIdAndUpdate(
    req.params.id,
    { title, description, content },
    { new: true }
  );

  if (!updatedCanvas) {
    return res.status(404).json({ message: "Canvas not found" });
  }

  res.json(updatedCanvas);
});


// @desc    create a canvas
// @route   POST /api/canvas
// @access  Private
const createCanvas = asyncHandler(async (req, res) => {
  const { title, description, content } = req.body;
  const newCanvas = await Canvas.create({
    title,
    description,
    createdBy: req.user.id,
    content,
  });
  if (newCanvas) {
    res.status(201).json(newCanvas);
  } else {
    console.error(error);
    res.status(500);
    throw new Error("Server Error");
  }
});

// @desc    delete a canvas
// @route   DELETE /api/canvases
// @access  Private
const deleteCanvas = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  const canvas = await Canvas.findById(req.params.id);

  // check for user and canvas existence
  if (!user || !canvas) {
    res.status(401);
    throw new Error("User or Canvas not found");
  }

  // make sure only the authenticated user created this canvas
  if (canvas.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const deletedCanvas = await Canvas.findByIdAndDelete(req.params.id);

  if (deletedCanvas) {
    res.json({ message: "Canvas deleted successfully" });
  }
});



export { getAllCanvas, getCanvas, updateCanvas, createCanvas, deleteCanvas };
