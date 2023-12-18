import mongoose from "mongoose";

const collaborationSchema = mongoose.Schema(
  {
    canvasId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Canvas",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name:{
      type:String,
      required: true,
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
