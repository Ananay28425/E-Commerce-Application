import express from "express";
import {
  getAllBooks,
  getBookByID,
  addBook,
  updateBookByID,
  deleteBook,
  showLandingPage,
  seedBooksData,
  showBookDetails,
  showAddBookPage,
  showManageBooksPage,
  findBookById,
  deleteBookById,
} from "../controllers/bookController.js";
import {
  authenticateJWT,
  authorizeRoles,
  validateBook,
} from "../middlewares/auth.js";

const router = express.Router();

// API routes (with authentication and validation)
router.post(
  "/add",
  authenticateJWT,
  authorizeRoles("admin"),
  validateBook,
  addBook,
);
router.get("/allBooks", authenticateJWT, getAllBooks);
router.get("/:id", authenticateJWT, getBookByID);
router.put(
  "/edit/:id",
  authenticateJWT,
  authorizeRoles("admin"),
  validateBook,
  updateBookByID,
);
router.delete("/:id", authenticateJWT, authorizeRoles("admin"), deleteBook);

// Public routes
router.post("/seed", seedBooksData);

// Landing page route
router.get("/landing", showLandingPage);

// View routes
router.get("/show/:id", showBookDetails);
router.get("/add", authenticateJWT, authorizeRoles("admin"), showAddBookPage);
router.get(
  "/manage",
  authenticateJWT,
  authorizeRoles("admin"),
  showManageBooksPage,
);
router.get("/find", authenticateJWT, authorizeRoles("admin"), findBookById);
router.post(
  "/delete",
  authenticateJWT,
  authorizeRoles("admin"),
  deleteBookById,
);

export default router;
