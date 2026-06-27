// backend/controllers/postController.js
const Post = require('../models/Post');

// 1. Nayi Job Post Create Karna (Customer ke liye)
exports.createPost = async (req, res) => {
  try {
    const { title, description, category, budget, deadline } = req.body;

    const newPost = new Post({
      customer: req.user._id, // Login wale customer ki ID
      title,
      description,
      category,
      budget,
      deadline,
    });

    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 2. Sabhi Jobs Fetch Karna (PUBLIC - Find Work Page ke liye)
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('customer', 'name profilePic company') // Customer ki info sath lao
      .sort({ createdAt: -1 }); // Naye jobs sabse pehle
      
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 3. Apni Posted Jobs Fetch Karna (Customer Dashboard - My Jobs ke liye)
exports.getMyPosts = async (req, res) => {
  try {
    const posts = await Post.find({ customer: req.user._id })
      .sort({ createdAt: -1 });
      
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 4. Job Delete Karna
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ message: 'Job post not found' });
    }

    // Check karein ke post usi customer ki hai
    if (post.customer.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this post' });
    }

    await post.deleteOne();
    res.status(200).json({ message: 'Job post deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Get Single Post by ID
exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('customer', 'name profilePic company email');
    
    if (!post) {
      return res.status(404).json({ message: 'Job post not found' });
    }
    
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};