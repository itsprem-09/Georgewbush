const jwt = require('jsonwebtoken');

/**
 * Middleware to protect admin routes
 * Verifies JWT token in the request header
 */
exports.protect = async (req, res, next) => {
  try {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];
    }

    // Check if token exists
    if (!token) {
      return res.status(401).json({
        success: false,
        error: 'Not authorized to access this route'
      });
    }

    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Check if user is admin
      if (!decoded.isAdmin) {
        return res.status(401).json({
          success: false,
          error: 'Not authorized to access admin routes'
        });
      }

      // Add user from payload to req object
      req.user = decoded;
      next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        error: 'Not authorized to access this route'
      });
    }
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
}; 