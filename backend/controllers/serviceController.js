const Service = require('../models/Service');

// 1. Create Service
exports.createService = async (req, res) => {
  try {
    const { title, description, category, price, deliveryTime } = req.body;
    const newService = new Service({
      provider: req.user._id,
      title, description, category, price, deliveryTime,
    });
    const savedService = await newService.save();
    res.status(201).json(savedService);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 2. Get All Services (Public - Find Talent Page)
exports.getServices = async (req, res) => {
  try {
    const services = await Service.find()
      .populate('provider', 'name profilePic averageRating email')
      .sort({ createdAt: -1 });
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 3. Get Single Service by ID (Service Detail Page)
exports.getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id)
      .populate('provider', 'name profilePic averageRating email');
      
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    
    res.status(200).json(service);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 4. Get My Services (Freelancer Dashboard)
exports.getMyServices = async (req, res) => {
  try {
    const services = await Service.find({ provider: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 5. Delete Service
exports.deleteService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) return res.status(404).json({ message: 'Service not found' });
    if (service.provider.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    await service.deleteOne();
    res.status(200).json({ message: 'Service deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};