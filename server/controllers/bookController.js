import Book from "../models/bookModel.js";
import mongoose from "mongoose";
import seedBooks from "./seedBooks.js";
import seedSimpleBooks from "./seedSimpleBooks.js";

export const getAllBooks = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const limit = req.query.limit || 3;

    const skip = (page - 1) * limit;

    const books = await Book.find().skip(skip).limit(limit);
    const totalBooks = await Book.countDocuments();
    const totalPages = totalBooks / limit;
    res.status(200).json({
      books,
      pagination: {
        currPage: page,
        totalBooks: totalBooks,
        totalPages: totalPages,
      },
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Books could not be fetched", error: err.message });
  }
};

export const addBook = async (req, res) => {
  try {
    const {
      title,
      author,
      publishedDate,
      genre,
      price,
      imageUrl,
      description,
    } = req.body;

    const newBook = new Book({
      title,
      author,
      genre,
      publishedDate,
      price,
      imageUrl:
        imageUrl ||
        `https://picsum.photos/seed/${title.replace(/\s+/g, "-").toLowerCase()}/200/300.jpg`,
      description,
    });

    await newBook.save();
    res.status(200).json({ message: "Book added successfully", book: newBook });
  } catch (err) {
    res.status(400).render("error", { err: err.message, user: req.user });
  }
};

export const getBookByID = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid book ID" });
    }

    const book = await Book.findById(id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json(book);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching book", error: error.message });
  }
};

export const updateBookByID = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedBookData = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(400)
        .render("error", { err: "Book ID is not valid", user: req.user });
    }

    const updatedBook = await Book.findByIdAndUpdate(id, updatedBookData, {
      new: true,
    });

    if (!updatedBook)
      return res
        .status(404)
        .render("error", { err: "Book not found", user: req.user });

    res.status(200).json({ updatedBook });
  } catch (err) {
    res.status(400).render("error", { err: err.message, user: req.user });
  }
};

// Landing page controller
export const showLandingPage = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;

    const skip = (page - 1) * limit;

    const books = await Book.find().skip(skip).limit(limit);
    const totalBooks = await Book.countDocuments();
    const totalPages = Math.ceil(totalBooks / limit);

    res.render("landing", {
      books,
      user: req.user,
      pagination: {
        currPage: page,
        totalBooks,
        totalPages,
      },
    });
  } catch (error) {
    console.error("Error rendering landing page:", error);
    res.status(500).render("error", {
      err: "Error loading books: " + error.message,
      user: req.user,
    });
  }
};

// Seed books controller
export const seedBooksData = async (req, res) => {
  try {
    const seededBooks = await seedSimpleBooks();
    res.status(200).json({
      message: "Books seeded successfully",
      count: seededBooks.length,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error seeding books",
      error: error.message,
    });
  }
};

export const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid book ID" });
    }

    const book = await Book.findByIdAndDelete(id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json({
      message: "Book deleted successfully",
      deletedBook: book,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting book",
      error: error.message,
    });
  }
};

// Show book details page with reviews
export const showBookDetails = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).render("error", {
        err: "Invalid book ID",
        user: req.user,
      });
    }

    const book = await Book.findById(id).populate("reviews");

    if (!book) {
      return res.status(404).render("error", {
        err: "Book not found",
        user: req.user,
      });
    }

    res.render("show", {
      book,
      user: req.user,
    });
  } catch (error) {
    console.error("Error showing book details:", error);
    res.status(500).render("error", {
      err: "Error loading book details: " + error.message,
      user: req.user,
    });
  }
};

// Show add book page
export const showAddBookPage = async (req, res) => {
  try {
    res.render("addProduct", {
      user: req.user,
      error: req.query.error || null,
      success: req.query.success || null,
    });
  } catch (error) {
    console.error("Error showing add book page:", error);
    res.status(500).render("error", {
      err: "Error loading add book page: " + error.message,
      user: req.user,
    });
  }
};

// Show manage books page
export const showManageBooksPage = async (req, res) => {
  try {
    res.render("manageBooks", {
      user: req.user,
      error: req.query.error || null,
      success: req.query.success || null,
    });
  } catch (error) {
    console.error("Error showing manage books page:", error);
    res.status(500).render("error", {
      err: "Error loading manage books page: " + error.message,
      user: req.user,
    });
  }
};

// Find book by ID (for management)
export const findBookById = async (req, res) => {
  try {
    const { id } = req.query;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.render("manageBooks", {
        user: req.user,
        error: "Invalid book ID format",
        book: null,
      });
    }

    const book = await Book.findById(id);

    if (!book) {
      return res.render("manageBooks", {
        user: req.user,
        error: "Book not found with the provided ID",
        book: null,
      });
    }

    res.render("manageBooks", {
      user: req.user,
      book,
      error: null,
      success: "Book found successfully!",
    });
  } catch (error) {
    console.error("Error finding book:", error);
    res.render("manageBooks", {
      user: req.user,
      error: "Error finding book: " + error.message,
      book: null,
    });
  }
};

// Delete book by ID (form submission)
export const deleteBookById = async (req, res) => {
  try {
    const { id } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.redirect("/book/manage?error=Invalid book ID format");
    }

    const book = await Book.findByIdAndDelete(id);

    if (!book) {
      return res.redirect("/book/manage?error=Book not found");
    }

    res.redirect(
      `/book/manage?success=Book "${book.title}" deleted successfully!`,
    );
  } catch (error) {
    console.error("Error deleting book:", error);
    res.redirect("/book/manage?error=Error deleting book: " + error.message);
  }
};
