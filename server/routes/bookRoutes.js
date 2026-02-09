import express from "express";
import {
  getAllBooks,
  getBookByID,
  addBook,
  updateBookByID,
  deleteBook,
  showLandingPage,
  seedBooksData
} from "../controllers/bookController.js";
import { authenticateJWT, authorizeRoles } from "../middlewares/auth.js";

const router = express.Router();

// API routes (with authentication)
router.post('/add', authenticateJWT, authorizeRoles("admin"), addBook);
router.get('/allBooks', authenticateJWT, getAllBooks);
router.get('/:id', authenticateJWT, getBookByID);
router.put('/edit/:id', authenticateJWT, authorizeRoles("admin"), updateBookByID);
router.delete('/:id', authenticateJWT, authorizeRoles("admin"), deleteBook);

// Public routes
router.post('/seed', seedBooksData);

// Landing page route
router.get('/landing', showLandingPage);

export default router;
