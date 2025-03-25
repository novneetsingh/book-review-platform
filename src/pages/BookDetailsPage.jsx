import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import RatingStars from "../components/RatingStars";
import ReviewForm from "../components/ReviewForm";
import AllReviews from "../components/AllReviews";
import { Loader } from "lucide-react";

const BookDetailsPage = () => {
  const { bookId } = useParams();
  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);

  const fetchReviews = async () => {
    try {
      const res = await axios.get(`/reviews/${bookId}`);
      setReviews(res.data.data);
    } catch (error) {
      console.error("Error fetching reviews: ", error);
    }
  };

  const fetchBookDetails = async () => {
    try {
      const res = await axios.get(`/books/${bookId}`);
      setBook(res.data.data);
    } catch (error) {
      console.error("Error fetching book details: ", error);
    }
  };

  useEffect(() => {
    fetchBookDetails();
    fetchReviews();
  }, [bookId]);

  if (!book) {
    return <Loader />;
  }

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-8">
      {/* Book Details Section */}
      <section className="bg-white shadow-md rounded-lg p-6 flex items-start space-x-6">
        <img
          src={book.coverImage}
          alt={book.title}
          className="w-48 h-48 rounded-lg"
        />
        <div>
          <h1 className="text-2xl font-bold mb-4">{book.title}</h1>
          <p className="text-gray-600 mb-2">by {book.author}</p>
          <RatingStars rating={book.averageRating || 0} />
          <p className="text-gray-700 mt-4">{book.description}</p>
          <p className="text-sm text-gray-500 mt-4">
            Published: {book.publicationYear}
          </p>
        </div>
      </section>

      {/* Review Form Section */}
      <ReviewForm
        bookId={bookId}
        fetchBookDetails={fetchBookDetails}
        fetchReviews={fetchReviews}
      />

      {/* All Reviews Section */}
      <AllReviews bookId={bookId} reviews={reviews} />
    </div>
  );
};

export default BookDetailsPage;
