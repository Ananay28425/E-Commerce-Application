import mongoose from "mongoose";
import Book from "../models/bookModel.js";

const seedSimpleBooks = async () => {
  try {
    await Book.deleteMany({});
    console.log("Cleared existing books");

    const sampleBooks = [
      {
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        genre: "Fiction",
        publishedDate: new Date("1925-04-10"),
        price: 12.99,
        imageUrl: "https://picsum.photos/seed/great-gatsby/200/300.jpg",
        description: "A classic American novel set in the Jazz Age."
      },
      {
        title: "1984",
        author: "George Orwell",
        genre: "Dystopian Fiction",
        publishedDate: new Date("1949-06-08"),
        price: 14.99,
        imageUrl: "https://picsum.photos/seed/1984-novel/200/300.jpg",
        description: "A dystopian social science fiction novel."
      },
      {
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        genre: "Fiction",
        publishedDate: new Date("1960-07-11"),
        price: 13.99,
        imageUrl: "https://picsum.photos/seed/mockingbird/200/300.jpg",
        description: "A story of racial injustice and childhood innocence."
      }
    ];

    const insertedBooks = await Book.insertMany(sampleBooks);
    console.log(`Successfully seeded ${insertedBooks.length} books`);
    return insertedBooks;
  } catch (error) {
    console.error("Error seeding books:", error);
    throw error;
  }
};

export default seedSimpleBooks;