const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Signup Controller for Registering Users
exports.signUp = async (req, res) => {
  try {
    // Destructure fields from the request body
    const { name, email, password, isAdmin } = req.body;

    // Check if all required fields are present
    if (!name || !email || !password) {
      return res.status(403).send({
        success: false,
        message: "All Fields are required",
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists. Please sign in to continue.",
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user record
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      isAdmin,
      image: `https://api.dicebear.com/5.x/initials/svg?seed=${name}`,
    });

    return res.status(200).json({
      success: true,
      message: "User registered successfully",
      data: user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "User cannot be registered. Please try again.",
    });
  }
};

// Login controller for authenticating users
exports.login = async (req, res) => {
  try {
    // Get email and password from request body
    const { email, password } = req.body;

    // Check if email or password is missing
    if (!email || !password) {
      // Return 400 Bad Request status code with error message
      return res.status(400).json({
        success: false,
        message: `Please Fill up All the Required Fields`,
      });
    }

    // Find user with provided email then populate additional fields and notes fields
    const user = await User.findOne({ email });

    // If user not found with provided email
    if (!user) {
      return res.status(401).json({
        success: false,
        message: `User is not Registered with Us. Please SignUp to Continue`,
      });
    }

    // Compare provided password with hashed password stored in the database
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: `Incorrect Password`,
      });
    }

    // If password matches, generate JWT token
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin }, // payload containing user ID and account type
      process.env.JWT_SECRET, // Secret key for signing JWT token
      {
        expiresIn: "1h", // Token expiration time
      }
    );

    // Save token to user document in database
    user.password = undefined; // Remove password from user object

    // Set options for cookie (optional)
    const options = {
      maxAge: 60 * 60 * 1000, // 1 hour
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Secure cookies in production
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax", // Fix for local development
      path: "/", // Cookie path
    };

    // Set cookie for token and return success response
    res.cookie("token", token, options).status(200).json({
      success: true,
      message: `User Login Success`,
      data: user,
    });
  } catch (error) {
    // If any error occurs during the process, return error response
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// logout controller for logging out users
exports.logout = async (req, res) => {
  try {
    // Clear the token cookie properly
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Must match cookie settings
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
      path: "/", // Ensures cookie is removed from all routes
    });

    return res.status(200).json({
      success: true,
      message: "User Logged Out Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
