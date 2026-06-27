const ActivityLog = require("../models/ActivityLog");

const logActivity = async (user, action, description) => {
  try {
    await ActivityLog.create({
      user,
      action,
      description,
    });
  } catch (error) {
    console.log("Activity log error:", error.message);
  }
};

module.exports = logActivity;