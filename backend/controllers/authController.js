const Admin = require('../models/Admin');

// @desc    Register admin
// @route   POST /api/auth/register
// @access  Public (would be restricted in production)
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Create admin
    const admin = await Admin.create({
      name,
      email,
      password
    });

    // Create token
    const token = admin.getSignedJwtToken();

    res.status(201).json({
      success: true,
      token
    });
  } catch (error) {
    console.error('Error registering admin:', error);
    
    if (error.code === 11000) {
      // Duplicate key error (email already exists)
      return res.status(400).json({
        success: false,
        error: 'Email already exists'
      });
    }
    
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc    Login admin
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate email & password
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: 'Please provide email and password'
      });
    }

    // Check for admin
    const admin = await Admin.findOne({ email }).select('+password');

    if (!admin) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      });
    }

    // Check if password matches
    const isMatch = await admin.matchPassword(password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      });
    }

    // Create token
    const token = admin.getSignedJwtToken();

    res.status(200).json({
      success: true,
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email
      }
    });
  } catch (error) {
    console.error('Error logging in admin:', error);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc    Get current logged in admin
// @route   GET /api/auth/me
// @access  Private
exports.getMe = async (req, res) => {
  try {
    const admin = await Admin.findById(req.user.id);

    res.status(200).json({
      success: true,
      data: admin
    });
  } catch (error) {
    console.error('Error getting admin profile:', error);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
}; 