const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { 
      type: String, 
      required: true,
      trim: true
    },
    email: { 
      type: String, 
      required: true, 
      unique: true,
      lowercase: true,
      trim: true
    },
    password: { 
      type: String, 
      minlength: 6
    },
    role: {
      type: String,
      enum: ["customer", "provider", "admin"],
      default: "customer",
    },
    profilePic: { 
      type: String, 
      default: "" 
    },
    googleId: { 
      type: String, 
      default: ""
    },
    bio: { type: String, default: "" },
    phone: { type: String, default: "" },
    location: { type: String, default: "" },
    website: { type: String, default: "" },
    skills: [{ type: String }],
    experience: [{
      title: String,
      company: String,
      duration: String,
      description: String,
    }],
    education: [{
      degree: String,
      institution: String,
      year: String,
    }],
    hourlyRate: { type: Number, default: 0 },
    categories: [{ type: String }],
    isProfileComplete: { type: Boolean, default: false },
    isVerified: { type: Boolean, default: false },
    company: { type: String, default: "" },
    isActive: { type: Boolean, default: true },
    lastLogin: { type: Date, default: Date.now }
  },
  { timestamps: true }
);



module.exports = mongoose.model("User", userSchema);