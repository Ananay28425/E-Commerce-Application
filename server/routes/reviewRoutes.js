import express from "express";
import {
  addReview,
  getBookReviews,
  deleteReview,
  updateReview,
  getReviewById,
} from "../controllers/reviewController.js";
import { validateReview } from "../middlewares/auth.js";

const router = express.Router();

// Add a review to a book (with validation)
router.post("/books/:id/review", validateReview, addReview);

// Get all reviews for a specific book
router.get("/books/:id/reviews", getBookReviews);

// Get a single review by ID
router.get("/:reviewId", getReviewById);

// Update a review (with validation)
router.patch("/:reviewId", validateReview, updateReview);

// Delete a review
router.delete("/:reviewId", deleteReview);

export default router;
