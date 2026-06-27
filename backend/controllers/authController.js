const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

exports.googleAuth = async (req, res) => {
  try {
    const { credential } = req.body;
    
    if (!credential) {
      return res.status(400).json({ message: "Google credential is required" });
    }
    
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    
    const payload = ticket.getPayload();
    const { email, name, picture, sub: googleId } = payload;
    
    let user = await User.findOne({ 
      $or: [{ email }, { googleId }] 
    });
    
    if (!user) {
      // ✅ Naya user banao
      user = new User({
        name,
        email,
        password: Math.random().toString(36).slice(-8),
        profilePic: picture,
        googleId,  // ✅ Google ID save karo
        role: 'customer',
        isProfileComplete: false,
        isVerified: true,
      });
      await user.save();
    } else {
      // ✅ Existing user - update karo
      if (!user.googleId) {
        user.googleId = googleId;
      }
      if (!user.profilePic && picture) {
        user.profilePic = picture;
      }
      user.isVerified = true;
      await user.save();
    }
    
    // ✅ JWT token generate
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );
    
    res.status(200).json({
      message: "Google authentication successful",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        profilePic: user.profilePic,
        isProfileComplete: user.isProfileComplete || false,
        profileCompletionPercentage: user.profileCompletionPercentage,
      },
    });
  } catch (error) {
    console.error('Google Auth Error:', error);
    res.status(500).json({ 
      message: 'Google authentication failed',
      error: error.message 
    });
  }
};

// ✅ REGISTER
exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ 
        message: "Yeh email pehle se registered hai. Please login karein ya doosra email use karein." 
      });
    }

    // Validate role
    if (!["customer", "provider"].includes(role)) {
      return res.status(400).json({ message: "Invalid role selected" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    // Generate token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        profilePic: user.profilePic,
        isProfileComplete: user.isProfileComplete || false,
      },
    });
  } catch (error) {
    console.error('Register Error:', error);
    res.status(500).json({ message: error.message });
  }
};

// ✅ LOGIN
exports.login = async (req, res) => {
  try {
    console.log("Request Body:", req.body);
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    console.log("User Found:", user);
    
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    
    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Password Match:", isMatch);
    
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        profilePic: user.profilePic,
        isProfileComplete: user.isProfileComplete || false,
      },
    });
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ message: error.message });
  }
};