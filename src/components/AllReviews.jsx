import React from "react";

const AllReviews = ({ reviews }) => {
  if (reviews.length === 0) return <p className="text-center text-gray-500">No reviews yet. Be the first to leave one!</p>;

  return (
    <section className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-6 border-b pb-4">All Reviews</h2>
      <div className="space-y-6">
        {reviews.map((review) => (
          <div
            key={review._id}
            className="bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition"
          >
            <p className="text-gray-800 mb-2">"{review.comment}"</p>
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-600">Rating: ⭐ {review.rating} / 5</p>
              <p className="text-sm text-gray-500">By: {review.user.name}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AllReviews;
