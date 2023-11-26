import mongoose from "mongoose";

const collaborationSchema = mongoose.Schema(
  {
    CanvasId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Canvas",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    collaborators: {
      type: [mongoose.Schema.Types.ObjectId],
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Collaboration = mongoose.model("collaboration", collaborationSchema);

export default Collaboration;
