const express = require("express");
const router = express.Router();

// Import controllers and middleware functions
const { login, signUp, logout } = require("../controllers/Auth");
const { getUserDetails, updateProfile } = require("../controllers/Profile");
const { auth } = require("../middlewares/auth");

// Authentication Routes
router.post("/login", login); // User login route
router.post("/signup", signUp); // User signup route
router.post("/logout", logout); // Route for user logout

// User Routes
router.get("/", auth, getUserDetails); // Get user details
router.put("/", auth, updateProfile); // Update user profile

module.exports = router;
