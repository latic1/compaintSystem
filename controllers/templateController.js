import asyncHandler from "express-async-handler";
import Template from "../models/templateModel.js";


// @desc    Get all template
// @route   GET /api/templates
// @access  Private
const getAllTemplate = asyncHandler(async (req, res) => {
  const templates = await Template.find();
  if (templates) {
    res.json(templates);
  } else {
    console.error(error);
    res.status(500);
    throw new Error("Server Error");
  }
});


// @desc    Get a template by id
// @route   GET /api/template/:id
// @access  Private
const getTemplate = asyncHandler(async (req, res) => {
  try {
    const template = await Template.findById(req.params.id);
    if (!template) {
      return res.status(404).json({ message: "Template not found" });
    }
    res.json(template);
  } catch (error) {
    console.error(error);
    res.status(500);
    throw new Error("Server Error");
  }
});


// @desc    Update a template
// @route   PUT /api/templates/:id
// @access  Private
const updateTemplate = asyncHandler(async (req, res) => {
  try {
    const { title, description, content } = req.body;
    const updatedCanvas = await Template.findByIdAndUpdate(
      req.params.id,
      { title, description, content },
      { new: true }
    );
    if (!updatedCanvas) {
      return res.status(404).json({ message: "Template not found" });
    }
    res.json(updatedCanvas);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});


// @desc    create a template
// @route   POST /api/template
// @access  Private
const createTemplate = asyncHandler(async (req, res) => {
  const { title, description, createdBy, content } = req.body;
  const newCanvas = await Template.create({
    title,
    description,
    createdBy,
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


// @desc    delete a template
// @route   DELETE /api/templates
// @access  Private
const delateTemplate = asyncHandler(async (req, res) => {
  try {
    const deletedCanvas = await Template.findByIdAndDelete(req.params.id);
    if (!deletedCanvas) {
      return res.status(404).json({ message: "Template not found" });
    }
    res.json({ message: "Template deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500);
    throw new Error("Server Error");
  }
});

export {
  getAllTemplate,
  getTemplate,
  updateTemplate,
  createTemplate,
  delateTemplate,
};
