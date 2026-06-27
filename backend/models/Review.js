const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    customer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

    provider: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

    project: { type: mongoose.Schema.Types.ObjectId, ref: "Project" },

    rating: { type: Number, min: 1, max: 5 },

    feedback: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Review", reviewSchema);