import mongoose from "mongoose";

const bookSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    minlength: [3, "The title cannot be shorter than 3 characters"],
  },
  author: {
    type: String,
    required: [true, "Author is required"],
    minlength: [3, "Author Name cannot be shorter than 3 characters"],
  },
  genre: {
    type: String,
    required: [true, "Genre is required"],
  },
  publishedDate: {
    type: Date,
    required: [true, "Publishing Date is required"],
    min: new Date("1700-01-01"),
    max: new Date(),
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
    min: [0, "Price cannot be negative"],
  },
  imageUrl: {
    type: String,
    default: "",
  },
  description: {
    type: String,
    maxlength: 500,
  },
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
});

// Middleware to cascade delete reviews when a book is deleted
bookSchema.post("findOneAndDelete", async function (deletedBook) {
  // This hook runs after a book is deleted with findOneAndDelete / findByIdAndDelete
  if (deletedBook && deletedBook.reviews && deletedBook.reviews.length > 0) {
    const Review = mongoose.model("Review");
    await Review.deleteMany({
      _id: { $in: deletedBook.reviews },
    });
  }
});

const Book = mongoose.model("Book", bookSchema);

export default Book;
