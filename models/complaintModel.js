import mongoose from "mongoose";

const complaintSchema = mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    indexNumber: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    complaint: { 
        type: String,
        required: true,
    },
    assignedTo: { 
        type: String,
        required: true, 
    },
    status: {
      type: String, 
      required: true, 
    },
  },
  {
    timestamps: true,
  }
);

const Complaint = mongoose.model("Complaint", complaintSchema);

export default Complaint;
