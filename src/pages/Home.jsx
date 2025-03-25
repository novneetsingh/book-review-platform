import React, { useState } from "react";
import BookCard from "../components/BookCard";
import { useSelector } from "react-redux";

const Home = () => {
  const { books } = useSelector((state) => state.books);
  const [filter, setFilter] = useState("All");

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const filteredBooks =
    filter === "All" ? books : books.filter((book) => book.genre === filter);

  const uniqueGenres = ["All", ...new Set(books.map((book) => book.genre))];

  return (
    <div className="p-4">
      {/* Filter Dropdown */}
      <div className="mb-6">
        <label className="mr-2 text-lg font-medium">Filter by Genre:</label>
        <select
          value={filter}
          onChange={handleFilterChange}
          className="p-2 border rounded-md"
        >
          {uniqueGenres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </div>

      {/* Book Grid */}
      <div className="grid grid-cols-6 gap-4">
        {filteredBooks.map((book) => (
          <BookCard key={book._id} book={book} />
        ))}
      </div>
    </div>
  );
};

export default Home;
