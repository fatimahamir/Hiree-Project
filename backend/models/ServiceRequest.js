const mongoose = require("mongoose");

const serviceRequestSchema = new mongoose.Schema(
  {
    customer: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User",
      required: true 
    },
    freelancer: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User",
      required: true 
    },
    type: {
      type: String,
      enum: ["service_request", "job_application"],
      required: true,
    },
    service: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Service" 
    },
    job: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Post" 
    },
    message: { 
      type: String,
      required: true 
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected", "in-progress", "completed"],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ServiceRequest", serviceRequestSchema);