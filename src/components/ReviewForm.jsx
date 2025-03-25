import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const ReviewForm = ({ bookId, fetchBookDetails, fetchReviews }) => {
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`/reviews/${bookId}`, { rating, comment });
      toast.success("Review submitted successfully");
      setRating(1);
      setComment("");
      fetchBookDetails();
      fetchReviews();
    } catch (error) {
      console.error("Error adding review: ", error);
      toast.error("You have already reviewed this book");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Add a Review</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium">Rating (1-5)</label>
        <select
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          className="w-full mt-1 p-2 border rounded-md"
          required
        >
          <option value="" disabled>
            Select a rating
          </option>
          <option value="1">1 - Poor</option>
          <option value="2">2 - Fair</option>
          <option value="3">3 - Good</option>
          <option value="4">4 - Very Good</option>
          <option value="5">5 - Excellent</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium">Comment</label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full mt-1 p-2 border rounded-md"
          required
        />
      </div>
      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Submit Review
      </button>
    </form>
  );
};

export default ReviewForm;
