const Review = require("../models/Review");

// CREATE REVIEW
exports.createReview = async (req, res) => {
  try {
    const review = await Review.create({
      customer: req.user.id,
      ...req.body,
    });

    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};