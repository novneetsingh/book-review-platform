const Review = require("../models/Review");
const Book = require("../models/Book");

// Create a review
exports.createReview = async (req, res) => {
  try {
    const user = req.user.id;
    const { bookId } = req.params;
    const { rating, comment } = req.body;

    // Get the book and populate its reviews
    const bookWithReviews = await Book.findById(bookId).populate({
      path: "reviews",
      select: "user",
    });

    if (!bookWithReviews) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    // Check if the user has already reviewed the book
    const existingReview = bookWithReviews.reviews.find(
      (review) => review.user.toString() === user
    );

    if (existingReview) {
      return res.status(400).json({
        success: false,
        message: "You have already reviewed this book",
      });
    }

    // Create review
    const review = await Review.create({
      book: bookId,
      user: req.user.id,
      rating,
      comment,
    });

    // Recalculate the new average rating
    const updatedBook = await Book.findByIdAndUpdate(
      bookId,
      { $push: { reviews: review._id } },
      { new: true }
    ).populate("reviews");

    const totalRating = updatedBook.reviews.reduce(
      (sum, rev) => sum + rev.rating,
      0
    );
    const newAvgRating = totalRating / updatedBook.reviews.length;

    updatedBook.averageRating = newAvgRating;
    await updatedBook.save();

    res.status(201).json({
      success: true,
      message: "Review created successfully",
      data: review,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating review",
      error: error.message,
    });
  }
};

// Get reviews for a book
exports.getBookReviews = async (req, res) => {
  try {
    const { bookId } = req.params;

    const reviews = await Review.find({ book: bookId })
      .populate("user", "name")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: reviews,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching reviews",
      error: error.message,
    });
  }
};
