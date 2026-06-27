const JobApplication = require("../models/JobApplication");
const { getIO } = require("../socket/socketHandler");
// ==============================
// Freelancer Apply on Job
// ==============================
exports.applyJob = async (req, res) => {
  try {
    const { customer, job, message } = req.body;

    // Check agar pehle hi apply kiya hua hai
    const alreadyApplied = await JobApplication.findOne({
      freelancer: req.user.id,
      job,
    });

    if (alreadyApplied) {
      return res.status(400).json({
        message: "You have already applied for this job.",
      });
    }

    const application = await JobApplication.create({
      freelancer: req.user.id,
      customer,
      job,
      message,
    });

    res.status(201).json(application);
  } catch (error) {
    console.error("Apply Job Error:", error);
    res.status(500).json({
      message: error.message,
    });
  }
};

// ==============================
// Dashboard Data
// ==============================
exports.getApplications = async (req, res) => {
  try {
    const { section } = req.query;

    const filter = {};

    // Freelancer Dashboard
    if (section === "my-applications") {
      filter.freelancer = req.user.id;
      filter.deletedByFreelancer = false;
    }

    // Customer Dashboard
    if (section === "received-proposals") {
      filter.customer = req.user.id;
      filter.deletedByCustomer = false;
    }

    const applications = await JobApplication.find(filter)
      .populate("freelancer", "name email profilePic")
      .populate("customer", "name email profilePic")
      .populate("job", "title budget category")
      .sort({ createdAt: -1 });

    res.json(applications);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message,
    });
  }
};



// ==============================
// Remove Notification
// ==============================
exports.deleteNotification = async (req, res) => {
  try {
    const application = await JobApplication.findById(req.params.id);

    if (!application) {
      return res.status(404).json({
        message: "Application not found",
      });
    }

    if (application.freelancer.toString() === req.user.id) {
      application.deletedByFreelancer = true;
    }

    if (application.customer.toString() === req.user.id) {
      application.deletedByCustomer = true;
    }

    await application.save();

    res.json({
      message: "Notification removed",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};
exports.updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    
    // ✅ 1. Pehle bina populate ke find karein taake ID easily match ho
    const application = await JobApplication.findById(req.params.id);

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    // ✅ 2. Customer ID ko safely extract karein (Object ya ObjectId dono handle honge)
    const customerId = application.customer._id 
      ? application.customer._id.toString() 
      : application.customer.toString();

    // ✅ 3. Authorization check
    if (customerId !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized: You are not the customer of this job." });
    }

    // ✅ 4. Status update karein
    application.status = status;
    await application.save();

    // ✅ 5. Ab populate karein taake frontend ko pura data mil jaye
    const updatedApp = await JobApplication.findById(application._id)
      .populate("freelancer", "name email")
      .populate("customer", "name email")
      .populate("job", "title");

    // ✅ 6. Socket Emit (Freelancer ko real-time update bhejne ke liye)
    try {
      const { getIO } = require("../socket/socketHandler");
      const io = getIO();
      
      if (updatedApp.freelancer?._id) {
        io.to(updatedApp.freelancer._id.toString()).emit("applicationStatusUpdated", {
          applicationId: updatedApp._id,
          status: status,
          jobTitle: updatedApp.job?.title || "Unknown Job",
          customerName: updatedApp.customer?.name || "Customer",
        });
      }
    } catch (socketError) {
      console.log("⚠️ Socket emit skipped:", socketError.message);
    }

    res.json(updatedApp);
  } catch (error) {
    console.error("Update Status Error:", error);
    res.status(500).json({ message: error.message });
  }
};