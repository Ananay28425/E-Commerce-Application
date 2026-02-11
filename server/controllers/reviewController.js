import Review from "../models/reviewModel.js";
import Book from "../models/bookModel.js";
import mongoose from "mongoose";

// Add a review to a book
export const addReview = async (req, res) => {
    try {
        const { id } = req.params;
        const { rating, comment } = req.body;

        // Validate book ID
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).render('error', {
                err: 'Invalid book ID',
                user: req.user
            });
        }

        // Check if book exists
        const book = await Book.findById(id);
        if (!book) {
            return res.status(404).render('error', {
                err: 'Book not found',
                user: req.user
            });
        }

        // Create new review
        const review = new Review({
            rating: Number(rating),
            comment,
            bookId: id,
            userId: req.user ? req.user.id : null,
            createdAt: new Date()
        });

        await review.save();

        // Add review to book's reviews array
        book.reviews.push(review._id);
        await book.save();

        res.redirect(`/book/show/${id}`);
    } catch (error) {
        console.error('Error adding review:', error);
        res.status(500).render('error', {
            err: 'Error adding review: ' + error.message,
            user: req.user
        });
    }
};

// Get all reviews for a book
export const getBookReviews = async (req, res) => {
    try {
        const { id } = req.params;

        // Validate book ID
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid book ID' });
        }

        const reviews = await Review.find({ bookId: id })
            .populate('userId', 'username')
            .sort({ createdAt: -1 });

        res.status(200).json(reviews);
    } catch (error) {
        console.error('Error fetching reviews:', error);
        res.status(500).json({
            error: 'Error fetching reviews: ' + error.message
        });
    }
};

// Delete a review
export const deleteReview = async (req, res) => {
    try {
        const { reviewId } = req.params;
        const { bookId } = req.body;

        // Validate review ID
        if (!mongoose.Types.ObjectId.isValid(reviewId)) {
            return res.status(400).render('error', {
                err: 'Invalid review ID',
                user: req.user
            });
        }

        // Find and delete the review
        const review = await Review.findByIdAndDelete(reviewId);

        if (!review) {
            return res.status(404).render('error', {
                err: 'Review not found',
                user: req.user
            });
        }

        // Remove review from book's reviews array
        if (bookId && mongoose.Types.ObjectId.isValid(bookId)) {
            await Book.findByIdAndUpdate(
                bookId,
                { $pull: { reviews: reviewId } }
            );
        }

        res.redirect(`/book/show/${bookId}`);
    } catch (error) {
        console.error('Error deleting review:', error);
        res.status(500).render('error', {
            err: 'Error deleting review: ' + error.message,
            user: req.user
        });
    }
};

// Update a review
export const updateReview = async (req, res) => {
    try {
        const { reviewId } = req.params;
        const { rating, comment, bookId } = req.body;

        // Validate review ID
        if (!mongoose.Types.ObjectId.isValid(reviewId)) {
            return res.status(400).render('error', {
                err: 'Invalid review ID',
                user: req.user
            });
        }

        // Update the review
        const review = await Review.findByIdAndUpdate(
            reviewId,
            {
                rating: Number(rating),
                comment
            },
            { new: true }
        );

        if (!review) {
            return res.status(404).render('error', {
                err: 'Review not found',
                user: req.user
            });
        }

        res.redirect(`/book/show/${bookId}`);
    } catch (error) {
        console.error('Error updating review:', error);
        res.status(500).render('error', {
            err: 'Error updating review: ' + error.message,
            user: req.user
        });
    }
};

// Get a single review by ID
export const getReviewById = async (req, res) => {
    try {
        const { reviewId } = req.params;

        // Validate review ID
        if (!mongoose.Types.ObjectId.isValid(reviewId)) {
            return res.status(400).json({ error: 'Invalid review ID' });
        }

        const review = await Review.findById(reviewId)
            .populate('userId', 'username')
            .populate('bookId', 'title');

        if (!review) {
            return res.status(404).json({ error: 'Review not found' });
        }

        res.status(200).json(review);
    } catch (error) {
        console.error('Error fetching review:', error);
        res.status(500).json({
            error: 'Error fetching review: ' + error.message
        });
    }
};
