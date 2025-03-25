import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import RatingStars from "./RatingStars";

const BookCard = ({ book }) => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.profile);

  const handleBookClick = () => {
    if (user) {
      navigate(`/books/${book._id}`);
    } else {
      navigate("/login");
    }
  };

  return (
    <div
      onClick={handleBookClick}
      className="bg-white rounded-md shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer flex flex-col h-full max-w-[200px]"
    >
      <div className="relative pb-[100%] overflow-hidden bg-gray-200">
        <img
          src={book.coverImage}
          alt={book.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
      <div className="p-3 flex-grow flex flex-col">
        <h3 className="font-bold text-sm mb-1 line-clamp-1">{book.title}</h3>
        <p className="text-gray-600 text-xs mb-1">by {book.author}</p>
        <RatingStars rating={book.averageRating || 0} />
        <p className="text-xs text-gray-500 mt-1 mb-1">{book.genre}</p>
        <p className="text-xs text-gray-700 line-clamp-2 flex-grow">
          {book.description}
        </p>
        <div className="mt-1 text-xs text-gray-500">
          Published: {book.publicationYear}
        </div>
      </div>
    </div>
  );
};

export default BookCard;
