import jwt from "jsonwebtoken";
import { bookSchema, reviewSchema } from "../schema.js";

export const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: "No token" });
  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err)
      return res.status(403).json({ message: "Invalid or expired token" });
    req.user = user;
    next();
  });
};

// Role-based access
export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied" });
    }
    next();
  };
};

// Validate book data using Joi
export const validateBook = (req, res, next) => {
  const { title, author, genre, publishedDate, price, imageUrl, description } =
    req.body;

  const { error } = bookSchema.validate({
    title,
    author,
    genre,
    publishedDate,
    price,
    imageUrl,
    description,
  });

  if (error) {
    const msg = error.details.map((err) => err.message).join(", ");
    return res.status(400).render("error", { err: msg, user: req.user });
  }
  next();
};

// Validate review data using Joi
export const validateReview = (req, res, next) => {
  const { rating, comment } = req.body;

  const { error } = reviewSchema.validate({
    rating: Number(rating),
    comment,
  });

  if (error) {
    const msg = error.details.map((err) => err.message).join(", ");
    return res.status(400).render("error", { err: msg, user: req.user });
  }
  next();
};
