const ProviderProfile = require('../models/ProviderProfile');
const User = require('../models/User');
const cloudinary = require('../config/cloudinary');

// Create or Update Provider Profile
const createOrUpdateProviderProfile = async (req, res) => {
  try {
    const { bio, skills, experience, hourlyRate, isAvailable } = req.body;

    // Check karein ke user provider hai ya nahi
    const user = await User.findById(req.user._id);
    if (user.role !== 'provider') {
      return res.status(403).json({ message: 'Only service providers can create provider profiles' });
    }

    // Profile dhundhein ya naya banayein
    let profile = await ProviderProfile.findOne({ user: req.user._id });

    if (profile) {
      // Update existing profile
      profile.bio = bio || profile.bio;
      profile.skills = skills || profile.skills;
      profile.experience = experience || profile.experience;
      profile.hourlyRate = hourlyRate || profile.hourlyRate;
      profile.isAvailable = isAvailable !== undefined ? isAvailable : profile.isAvailable;
    } else {
      // Create new profile
      profile = new ProviderProfile({
        user: req.user._id,
        bio,
        skills,
        experience,
        hourlyRate,
        isAvailable,
      });
    }

    await profile.save();

    res.status(200).json({
      message: profile.isNew ? 'Provider profile created successfully' : 'Provider profile updated successfully',
      profile,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Provider Profile (by User ID)
const getProviderProfile = async (req, res) => {
  try {
    const profile = await ProviderProfile.findOne({ user: req.params.userId })
      .populate('user', 'name email profilePic');

    if (!profile) {
      return res.status(404).json({ message: 'Provider profile not found' });
    }

    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get My Provider Profile (Logged-in Provider)
const getMyProviderProfile = async (req, res) => {
  try {
    const profile = await ProviderProfile.findOne({ user: req.user._id })
      .populate('user', 'name email profilePic');

    // ✅ FIX: Agar profile nahi hai toh empty profile return karein (404 nahi)
    if (!profile) {
      return res.status(200).json({
        _id: null,
        user: {
          _id: req.user._id,
          name: req.user.name || 'User',
          email: req.user.email || '',
          profilePic: req.user.profilePic || '',
        },
        bio: '',
        skills: [],
        experience: { years: 0, description: '' },
        hourlyRate: 0,
        portfolio: [],
        totalEarnings: 0,
        averageRating: 0,
        totalReviews: 0,
        isAvailable: true,
      });
    }

    res.status(200).json(profile);
  } catch (error) {
    console.error('❌ getMyProviderProfile Error:', error);
    res.status(500).json({ message: error.message });
  }
};

// Add Portfolio Item
const addPortfolioItem = async (req, res) => {
  try {
    const profile = await ProviderProfile.findOne({ user: req.user._id });
    if (!profile) {
      return res.status(404).json({ message: 'Provider profile not found' });
    }

    let portfolioImage = '';
    
    // Agar image upload hui hai toh Cloudinary par upload karein
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'hiree/portfolio',
        width: 800,
        height: 600,
        crop: 'fill',
      });
      portfolioImage = result.secure_url;
    }

    const newItem = {
      title: req.body.title,
      description: req.body.description,
      image: portfolioImage,
      link: req.body.link,
    };

    profile.portfolio.push(newItem);
    await profile.save();

    res.status(200).json({
      message: 'Portfolio item added successfully',
      portfolio: profile.portfolio,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Portfolio Item
const deletePortfolioItem = async (req, res) => {
  try {
    const profile = await ProviderProfile.findOne({ user: req.user._id });
    if (!profile) {
      return res.status(404).json({ message: 'Provider profile not found' });
    }

    profile.portfolio = profile.portfolio.filter(
      (item) => item._id.toString() !== req.params.itemId
    );
    await profile.save();

    res.status(200).json({
      message: 'Portfolio item deleted successfully',
      portfolio: profile.portfolio,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Providers (Public)
const getAllProviders = async (req, res) => {
  try {
    const providers = await ProviderProfile.find({ isAvailable: true })
      .populate('user', 'name email profilePic')
      .sort({ averageRating: -1 });

    res.status(200).json(providers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createOrUpdateProviderProfile,
  getProviderProfile,
  getMyProviderProfile,
  addPortfolioItem,
  deletePortfolioItem,
  getAllProviders,
};