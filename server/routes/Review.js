const express = require("express");
const router = express.Router();
const { auth } = require("../middlewares/auth");
const {
  createReview,
  getBookReviews,
} = require("../controllers/Review");

// get reviews for a book
router.get("/:bookId", getBookReviews);

// create a review
router.post("/:bookId", auth, createReview);


module.exports = router;
