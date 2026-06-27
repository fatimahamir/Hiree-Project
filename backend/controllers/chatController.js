const Message = require("../models/Message");

// SEND MESSAGE
exports.sendMessage = async (req, res) => {
  try {
    const message = await Message.create({
      sender: req.user.id,
      ...req.body,
    });

    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET MESSAGES
exports.getMessages = async (req, res) => {
  try {
    const messages = await Message.find({
      project: req.params.projectId,
    });

    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};