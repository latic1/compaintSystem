import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import Upload from "../models/uploadModel.js";

// @desc    Get all upload
// @route   GET /api/uploads
// @access  Private
const getAllUpload = asyncHandler(async (req, res) => {
  const userid = await User.findById(req.user._id);

  const uploads = await Upload.find({uploadedBy:userid});
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
  const { title, content } = req.body;

  const upload = await Upload.findById(req.params.id);
  const user = await User.findById(req.user.id);

  // check for user
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  // make sure only the authenticated user created this upload
  if (!upload || upload.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const updatedUpload = await Upload.findByIdAndUpdate(
    req.params.id,
    { title, content },
    { new: true }
  );

  if (!updatedUpload) {
    return res.status(404).json({ message: "Upload not found" });
  }

  res.json(updatedUpload);
});



// @desc    create a upload
// @route   POST /api/uploads
// @access  Private
const createUpload = asyncHandler(async (req, res) => {
  const { title, content } = req.body;
  const upload = await Upload.create({
    title,
    uploadedBy: req.user.id,
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
  const user = await User.findById(req.user.id);

  // check for user
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const upload = await Upload.findById(req.params.id);

  // make sure only the authenticated user created this upload
  if (!upload || upload.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const deletedUpload = await Upload.findByIdAndDelete(req.params.id);

  res.json({ message: "Upload deleted successfully" });
});




export { getAllUpload, getUpload, updateUpload, createUpload, deleteUpload };
