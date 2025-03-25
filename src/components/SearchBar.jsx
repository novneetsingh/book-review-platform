import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { debounce } from "lodash";
import { setBooks } from "../redux-toolkit/slices/bookSlice";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();

  // Fetch books from API
  const fetchBooks = debounce(async (query) => {
    try {
      const res = await axios.get(`/books/search/?search=${query}`);
      dispatch(setBooks(res.data.data));
    } catch (error) {
      console.error("Error fetching books: ", error);
    }
  }, 500);

  useEffect(() => {
    fetchBooks(searchQuery);
  }, [searchQuery]);

  return (
    <input
      type="text"
      onChange={(e) => setSearchQuery(e.target.value)}
      placeholder="Search books..."
      className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
    />
  );
};

export default SearchBar;
