const Book = require("../models/Book");

// Create a new book
exports.createBook = async (req, res) => {
  try {
    const { title, author, genre, description, publicationYear, coverImage } =
      req.body;

    const existingBook = await Book.findOne({ title, author, genre });
    if (existingBook) {
      return res.status(400).json({
        success: false,
        message: "Book with this title, author and genre already exists",
      });
    }

    // create a new book
    const book = await Book.create({
      title,
      author,
      genre,
      description,
      publicationYear,
      coverImage,
      createdBy: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Book created successfully",
      data: book,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating book",
      error: error.message,
    });
  }
};

// Get all books
exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: books,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching books",
      error: error.message,
    });
  }
};

// Get single book by ID with creator details
exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate(
      "createdBy",
      "name"
    );

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    res.status(200).json({
      success: true,
      data: book,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching book",
      error: error.message,
    });
  }
};

// Search books
exports.searchBooks = async (req, res) => {
  try {
    let searchQuery = req.query.search;
    searchQuery = searchQuery.toLowerCase();

    // find all books
    const books = await Book.find();

    // filter books based on search query
    const searchResults = books.filter((book) => {
      return (
        book.title.toLowerCase().includes(searchQuery) ||
        book.author.toLowerCase().includes(searchQuery) ||
        book.genre.toLowerCase().includes(searchQuery)
      );
    });

    res.status(200).json({
      success: true,
      data: searchResults,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error searching books",
      error: error.message,
    });
  }
};
