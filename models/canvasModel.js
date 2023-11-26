import mongoose from "mongoose";

const canvasSchema = mongoose.Schema(
  {
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    content: {
      type: Object,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Canvas = mongoose.model("Canvas", canvasSchema);

export default Canvas;
