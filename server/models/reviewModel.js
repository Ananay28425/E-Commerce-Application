import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  rating: {
    type: Number,
    required: [true, "Rating is required"],
    min: [0, "Rating cannot be less than 0"],
    max: [5, "Rating cannot be more than 5"],
  },
  comment: {
    type: String,
    required: [true, "Comment is required"],
    minlength: [5, "Comment must be at least 5 characters long"],
    maxlength: [500, "Comment cannot exceed 500 characters"],
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User ID is required"],
  },
  bookId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Book",
    required: [true, "Book ID is required"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Review = mongoose.model("Review", reviewSchema);

export default Review;
