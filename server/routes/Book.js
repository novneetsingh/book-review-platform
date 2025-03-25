const express = require("express");
const router = express.Router();
const { auth, isAdmin } = require("../middlewares/auth");
const {
  createBook,
  getAllBooks,
  getBookById,
  searchBooks,
} = require("../controllers/Book");

// Public routes
router.get("/", getAllBooks);
router.get("/search", searchBooks); // Public route for searching books
router.get("/:id", getBookById); // Public route for getting book details by ID

// Protected routes (require authentication)
router.post("/", auth, isAdmin, createBook); // Create new book

module.exports = router;
