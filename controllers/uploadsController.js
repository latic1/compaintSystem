import asyncHandler from "express-async-handler";
import Upload from "../models/uploadModel.js";

// @desc    Get all upload
// @route   GET /api/uploads
// @access  Private
const getAllUpload = asyncHandler(async (req, res) => {
  const uploads = await Upload.find();
  if (uploads) {
    res.json(uploads);
  } else {
    console.error(error);
    res.status(500);
    throw new Error("Server Error");
  }
});

// @desc    Get a upload by id
// @route   GET /api/uploads/:id
// @access  Private
const getUpload = asyncHandler(async (req, res) => {
  try {
    const upload = await Upload.findById(req.params.id);
    if (!upload) {
      return res.status(404).json({ message: "Upload not found" });
    }
    res.json(upload);
  } catch (error) {
    console.error(error);
    res.status(500);
    throw new Error("Server Error");
  }
});

// @desc    Update a upload
// @route   PUT /api/uploads/:id
// @access  Private
const updateUpload = asyncHandler(async (req, res) => {
  try {
    const { title, content } = req.body;
    const upload = await Upload.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true }
    );
    if (!upload) {
      return res.status(404).json({ message: "Upload not found" });
    }
    res.json(upload);
  } catch (error) {
    console.error(error);
    throw new Error("Server Error");
  }
});

// @desc    create a upload
// @route   POST /api/uploads
// @access  Private
const createUpload = asyncHandler(async (req, res) => {
  const { title,  uploadedBy, content } = req.body;
  const upload = await Upload.create({
    title,
    uploadedBy,
    content,
  });
  if (upload) {
    res.status(201).json(upload);
  } else {
    console.error(error);
    res.status(500);
    throw new Error("Server Error");
  }
});

// @desc    delete a upload
// @route   DELETE /api/uploads
// @access  Private
const deleteUpload = asyncHandler(async (req, res) => {
  try {
    const upload = await Upload.findByIdAndDelete(req.params.id);
    if (!upload) {
      return res.status(404).json({ message: "Upload not found" });
    }
    res.json({ message: "Upload deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500);
    throw new Error("Server Error");
  }
});

export {
  getAllUpload,
  getUpload,
  updateUpload,
  createUpload,
  deleteUpload,
};
