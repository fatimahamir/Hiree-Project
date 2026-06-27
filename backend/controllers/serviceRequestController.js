const ServiceRequest = require("../models/ServiceRequest");

// CREATE REQUEST (Customer → Freelancer OR Freelancer → Customer)
exports.createRequest = async (req, res) => {
  try {
    const { freelancer, type, service, job, message } = req.body;
    
    const requestData = {
      type,
      message,
    };

    if (type === "service_request") {
      // Customer is sending request to freelancer
      requestData.customer = req.user.id;
      requestData.freelancer = freelancer;
      requestData.service = service;
    } else if (type === "job_application") {
      // Freelancer is applying to customer's job
      requestData.freelancer = req.user.id;
      requestData.customer = freelancer; // Yahan freelancer = customer ki ID
      requestData.job = job;
    }

    const request = await ServiceRequest.create(requestData);
    res.status(201).json(request);
  } catch (error) {
    console.error("Create Request Error:", error);
    res.status(500).json({ message: error.message });
  }
};

exports.getRequests = async (req, res) => {
  try {
    const { section } = req.query;
    
    // ❌ PURANA: const filter = { status: 'pending' }; 
    // ✅ NAYA: Koi default status filter nahi, sari requests dikhayen ga
    const filter = {}; 

    if (section === 'incoming') {
      filter.freelancer = req.user.id;
      filter.type = 'service_request';
    } else if (section === 'my-requests') {
      filter.customer = req.user.id;
      filter.type = 'service_request';
    }

    const requests = await ServiceRequest.find(filter)
      .populate('customer', 'name profilePic email')
      .populate('freelancer', 'name profilePic email')
      .populate('service', 'title category price')
      .populate('job', 'title category budget')
      .sort({ createdAt: -1 });

    res.json(requests);
  } catch (error) {
    console.error('Get Requests Error:', error);
    res.status(500).json({ message: error.message });
  }
};

exports.updateRequestStatus = async (req, res) => {
  try {
    const { status } = req.body;
    
    // ✅ 1. Bina populate ke find karein
    const request = await ServiceRequest.findById(req.params.id);

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    // ✅ 2. Safely IDs extract karein
    const freelancerId = request.freelancer._id ? request.freelancer._id.toString() : request.freelancer.toString();
    const customerId = request.customer._id ? request.customer._id.toString() : request.customer.toString();

    // ✅ 3. Authorization check
    let isAuthorized = false;
    if (request.type === "service_request" && freelancerId === req.user.id) {
      isAuthorized = true;
    }
    if (request.type === "job_application" && customerId === req.user.id) {
      isAuthorized = true;
    }

    if (!isAuthorized) {
      return res.status(403).json({ message: "Not authorized" });
    }

    // ✅ 4. Status update
    request.status = status;
    await request.save();

    // ✅ 5. Ab populate karein response ke liye
    const updatedReq = await ServiceRequest.findById(request._id)
      .populate("freelancer", "name email")
      .populate("customer", "name email")
      .populate("service", "title")
      .populate("job", "title");

    // ✅ 6. Socket emit to Customer
    try {
      const { getIO } = require("../socket/socketHandler");
      const io = getIO();
      
      if (request.type === "service_request" && updatedReq.customer?._id) {
        io.to(updatedReq.customer._id.toString()).emit("serviceRequestStatusUpdated", {
          requestId: updatedReq._id,
          status: status,
          serviceTitle: updatedReq.service?.title || "a Service",
          freelancerName: updatedReq.freelancer?.name || "The Freelancer",
        });
      }
    } catch (socketError) {
      console.log("⚠️ Socket emit skipped:", socketError.message);
    }

    res.json(updatedReq);
  } catch (error) {
    console.error("Update Status Error:", error);
    res.status(500).json({ message: error.message });
  }
};
// ==============================
// DELETE REQUEST (Cross button ke liye)
// ==============================
exports.deleteRequest = async (req, res) => {
  try {
    const request = await ServiceRequest.findById(req.params.id);

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    // Hard delete (Record DB se delete ho jayega)
    await ServiceRequest.findByIdAndDelete(req.params.id);
    
    res.json({ message: "Request removed successfully" });
  } catch (error) {
    console.error("Delete Request Error:", error);
    res.status(500).json({ message: error.message });
  }
};