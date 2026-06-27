const mongoose = require('mongoose');

const providerProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true, // Ek user ka sirf ek provider profile
  },
  bio: {
    type: String,
    maxlength: 500,
  },
  skills: [{
    type: String,
  }],
  experience: {
    years: { type: Number, default: 0 },
    description: { type: String },
  },
  hourlyRate: {
    type: Number,
    default: 0,
  },
  portfolio: [{
    title: String,
    description: String,
    image: String,
    link: String,
  }],
  totalEarnings: {
    type: Number,
    default: 0,
  },
  averageRating: {
    type: Number,
    default: 0,
  },
  totalReviews: {
    type: Number,
    default: 0,
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('ProviderProfile', providerProfileSchema);