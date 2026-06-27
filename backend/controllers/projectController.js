const Project = require("../models/Project");

// UPDATE STATUS
exports.updateProjectStatus = async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );

    res.json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET PROJECTS
exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find()
      .populate("customer")
      .populate("provider");

    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};