const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    request: { type: mongoose.Schema.Types.ObjectId, ref: "ServiceRequest" },

    customer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

    provider: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

    status: {
      type: String,
      enum: ["pending", "accepted", "in-progress", "completed", "delivered"],
      default: "pending",
    },

    deliveryFiles: [String],

    completedAt: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);