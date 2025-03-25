const jwt = require("jsonwebtoken");

// Authentication middleware
exports.auth = (req, res, next) => {
  try {
    // Extract token from various sources
    const token =
      req.cookies.token || req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      // If token is missing, return 401 Unauthorized
      return res.status(401).json({
        success: false,
        message: "Token missing",
      });
    }

    // Verify the token
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // Add decoded token payload to the request object
      req.user = decoded;
      next();
    } catch (error) {
      // If token is invalid, return 401 Unauthorized
      return res.status(401).json({
        success: false,
        message: "Invalid token",
      });
    }
  } catch (error) {
    // If an error occurs, return 401 Unauthorized
    console.error("Error verifying token:", error);
    return res.status(401).json({
      success: false,
      message: "Error verifying token",
    });
  }
};

// Middleware to restrict access to admin role only
exports.isAdmin = async (req, res, next) => {
  try {
    if (!req.user.isAdmin) {
      return res.status(403).json({
        success: false,
        message: "Access denied. This is a protected route for admins only",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error verifying user role",
    });
  }
};
