const Subscription = require('../models/Subscription');

// @desc    Create a new subscription
// @route   POST /api/subscribe
// @access  Public
exports.createSubscription = async (req, res) => {
  try {
    const { email, firstName, lastName, city, state, zip, fiveForFriday, catalyst } = req.body;

    // Check if email already exists
    const existingSubscription = await Subscription.findOne({ email });
    if (existingSubscription) {
      // Update existing subscription
      const updatedSubscription = await Subscription.findOneAndUpdate(
        { email },
        { firstName, lastName, city, state, zip, fiveForFriday, catalyst, status: 'active' },
        { new: true, runValidators: true }
      );

      return res.status(200).json({
        success: true,
        data: updatedSubscription,
        message: 'Your subscription preferences have been updated'
      });
    }

    // Create new subscription
    const subscription = await Subscription.create({
      email,
      firstName,
      lastName,
      city,
      state,
      zip,
      fiveForFriday,
      catalyst
    });

    res.status(201).json({
      success: true,
      data: subscription,
      message: 'Thank you for subscribing!'
    });
  } catch (error) {
    console.error('Error processing subscription:', error);
    
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

// @desc    Get all subscriptions
// @route   GET /api/subscribe
// @access  Admin (would require auth in production)
exports.getSubscriptions = async (req, res) => {
  try {
    const subscriptions = await Subscription.find().sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: subscriptions.length,
      data: subscriptions
    });
  } catch (error) {
    console.error('Error fetching subscriptions:', error);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc    Get subscription by ID
// @route   GET /api/subscribe/:id
// @access  Admin (would require auth in production)
exports.getSubscriptionById = async (req, res) => {
  try {
    const subscription = await Subscription.findById(req.params.id);
    
    if (!subscription) {
      return res.status(404).json({
        success: false,
        error: 'Subscription not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: subscription
    });
  } catch (error) {
    console.error('Error fetching subscription:', error);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc    Update subscription
// @route   PUT /api/subscribe/:id
// @access  Admin (would require auth in production)
exports.updateSubscription = async (req, res) => {
  try {
    const subscription = await Subscription.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!subscription) {
      return res.status(404).json({
        success: false,
        error: 'Subscription not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: subscription
    });
  } catch (error) {
    console.error('Error updating subscription:', error);
    
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

// @desc    Unsubscribe
// @route   PUT /api/subscribe/unsubscribe
// @access  Public
exports.unsubscribe = async (req, res) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({
        success: false,
        error: 'Email is required'
      });
    }
    
    const subscription = await Subscription.findOneAndUpdate(
      { email },
      { status: 'unsubscribed' },
      { new: true }
    );
    
    if (!subscription) {
      return res.status(404).json({
        success: false,
        error: 'Subscription not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'You have been unsubscribed successfully'
    });
  } catch (error) {
    console.error('Error unsubscribing:', error);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc    Delete subscription
// @route   DELETE /api/subscribe/:id
// @access  Admin (would require auth in production)
exports.deleteSubscription = async (req, res) => {
  try {
    const subscription = await Subscription.findByIdAndDelete(req.params.id);
    
    if (!subscription) {
      return res.status(404).json({
        success: false,
        error: 'Subscription not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    console.error('Error deleting subscription:', error);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
}; 