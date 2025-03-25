const express = require("express");
const app = express();
require("dotenv").config(); // Load environment variables from .env file
const cors = require("cors");
const cookieParser = require("cookie-parser");

// Import routes
const userRoutes = require("./routes/User");
const bookRoutes = require("./routes/Book");
const reviewRoutes = require("./routes/Review");

// Define port number
const PORT = process.env.PORT || 3000;

// Middleware setup
app.use(cookieParser()); // Parse cookies
app.use(express.json()); // Parse JSON requests

// Enable CORS for all routes with credentials
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

require("./config/database").dbconnect(); // Connect to database

// Route setup
app.use("/user", userRoutes); // User authentication routes
app.use("/books", bookRoutes); // Book routes
app.use("/reviews", reviewRoutes); // Review routes

// Default route
app.get("/", (req, res) => {
  res.send("<h1>Book Review Platform API</h1>"); // Simple response for root route
});

// Activate server
app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
