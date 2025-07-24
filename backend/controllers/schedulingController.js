const SchedulingRequest = require('../models/SchedulingRequest');

// @desc    Create a new scheduling request
// @route   POST /api/scheduling
// @access  Public
exports.createSchedulingRequest = async (req, res) => {
  try {
    const schedulingData = {
      ...req.body
    };

    const schedulingRequest = await SchedulingRequest.create(schedulingData);

    res.status(201).json({
      success: true,
      data: schedulingRequest
    });
  } catch (error) {
    console.error('Error creating scheduling request:', error);
    
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        error: messages
      });
    }
    
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc    Get all scheduling requests
// @route   GET /api/scheduling
// @access  Admin (would require auth in production)
exports.getSchedulingRequests = async (req, res) => {
  try {
    const schedulingRequests = await SchedulingRequest.find().sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: schedulingRequests.length,
      data: schedulingRequests
    });
  } catch (error) {
    console.error('Error fetching scheduling requests:', error);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc    Get scheduling request by ID
// @route   GET /api/scheduling/:id
// @access  Admin (would require auth in production)
exports.getSchedulingRequestById = async (req, res) => {
  try {
    const schedulingRequest = await SchedulingRequest.findById(req.params.id);
    
    if (!schedulingRequest) {
      return res.status(404).json({
        success: false,
        error: 'Scheduling request not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: schedulingRequest
    });
  } catch (error) {
    console.error('Error fetching scheduling request:', error);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc    Update scheduling request status
// @route   PUT /api/scheduling/:id
// @access  Admin (would require auth in production)
exports.updateSchedulingRequestStatus = async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!['pending', 'approved', 'rejected'].includes(status)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid status value'
      });
    }
    
    const schedulingRequest = await SchedulingRequest.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );
    
    if (!schedulingRequest) {
      return res.status(404).json({
        success: false,
        error: 'Scheduling request not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: schedulingRequest
    });
  } catch (error) {
    console.error('Error updating scheduling request status:', error);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc    Delete scheduling request
// @route   DELETE /api/scheduling/:id
// @access  Admin (would require auth in production)
exports.deleteSchedulingRequest = async (req, res) => {
  try {
    const schedulingRequest = await SchedulingRequest.findByIdAndDelete(req.params.id);
    
    if (!schedulingRequest) {
      return res.status(404).json({
        success: false,
        error: 'Scheduling request not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    console.error('Error deleting scheduling request:', error);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
}; 