const Contact = require('../models/Contact');

// @desc    Submit a contact form message
// @route   POST /api/contact
// @access  Public
exports.submitContactForm = async (req, res) => {
  try {
    const { name, email, message, inquiryType } = req.body;

    const contact = await Contact.create({
      name,
      email,
      message,
      inquiryType: inquiryType || 'general'
    });

    res.status(201).json({
      success: true,
      data: contact,
      message: 'Your message has been submitted successfully!'
    });
  } catch (error) {
    console.error('Error submitting contact form:', error);
    
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

// @desc    Get all contact messages
// @route   GET /api/contact
// @access  Admin (would require auth in production)
exports.getContactMessages = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: contacts.length,
      data: contacts
    });
  } catch (error) {
    console.error('Error fetching contact messages:', error);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc    Get contact message by ID
// @route   GET /api/contact/:id
// @access  Admin (would require auth in production)
exports.getContactById = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    
    if (!contact) {
      return res.status(404).json({
        success: false,
        error: 'Contact message not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: contact
    });
  } catch (error) {
    console.error('Error fetching contact message:', error);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc    Update contact message status
// @route   PUT /api/contact/:id
// @access  Admin (would require auth in production)
exports.updateContactStatus = async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!['new', 'in-progress', 'resolved'].includes(status)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid status value'
      });
    }
    
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );
    
    if (!contact) {
      return res.status(404).json({
        success: false,
        error: 'Contact message not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: contact
    });
  } catch (error) {
    console.error('Error updating contact status:', error);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc    Delete contact message
// @route   DELETE /api/contact/:id
// @access  Admin (would require auth in production)
exports.deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    
    if (!contact) {
      return res.status(404).json({
        success: false,
        error: 'Contact message not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    console.error('Error deleting contact message:', error);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
}; 