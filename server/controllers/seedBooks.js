import mongoose from "mongoose";
import Book from "../models/bookModel.js";

const seedBooks = async () => {
  try {
    // Clear existing books
    await Book.deleteMany({});
    console.log("Cleared existing books");

    const sampleBooks = [
      {
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        genre: "Fiction",
        publishedDate: new Date("1925-04-10").setFullYear(1925),
        price: 12.99,
        imageUrl: "https://picsum.photos/seed/great-gatsby/200/300.jpg",
        description: "A classic American novel set in the Jazz Age, exploring themes of wealth, love, and the American Dream."
      },
      {
        title: "1984",
        author: "George Orwell",
        genre: "Dystopian Fiction",
        publishedDate: new Date("1949-06-08").setFullYear(1949),
        price: 14.99,
        imageUrl: "https://picsum.photos/seed/1984-novel/200/300.jpg",
        description: "A dystopian social science fiction novel and cautionary tale about the dangers of totalitarianism."
      },
      {
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        genre: "Fiction",
        publishedDate: new Date("1960-07-11").setFullYear(1960),
        price: 13.99,
        imageUrl: "https://picsum.photos/seed/mockingbird/200/300.jpg",
        description: "A powerful story of racial injustice and childhood innocence in the American South."
      },
      {
        title: "Pride and Prejudice",
        author: "Jane Austen",
        genre: "Romance",
        publishedDate: new Date("1913-01-28"),
        price: 11.99,
        imageUrl: "https://picsum.photos/seed/pride-prejudice/200/300.jpg",
        description: "A romantic novel of manners that charts the emotional development of Elizabeth Bennet."
      },
      {
        title: "The Catcher in the Rye",
        author: "J.D. Salinger",
        genre: "Fiction",
        publishedDate: new Date("1951-07-16").setFullYear(1951),
        price: 13.49,
        imageUrl: "https://picsum.photos/seed/catcher-rye/200/300.jpg",
        description: "A story about teenage rebellion and angst, narrated by the iconic Holden Caulfield."
      },
      {
        title: "The Hobbit",
        author: "J.R.R. Tolkien",
        genre: "Fantasy",
        publishedDate: new Date("1937-09-21").setFullYear(1937),
        price: 15.99,
        imageUrl: "https://picsum.photos/seed/hobbit/200/300.jpg",
        description: "A fantasy adventure about Bilbo Baggins' journey to help dwarves reclaim their mountain home."
      },
      {
        title: "Harry Potter and the Sorcerer's Stone",
        author: "J.K. Rowling",
        genre: "Fantasy",
        publishedDate: new Date("1997-06-26").setFullYear(1997),
        price: 16.99,
        imageUrl: "https://picsum.photos/seed/harry-potter/200/300.jpg",
        description: "The magical beginning of Harry Potter's journey at Hogwarts School of Witchcraft and Wizardry."
      },
      {
        title: "The Da Vinci Code",
        author: "Dan Brown",
        genre: "Mystery",
        publishedDate: new Date("2003-03-18").setFullYear(2003),
        price: 14.49,
        imageUrl: "https://picsum.photos/seed/da-vinci-code/200/300.jpg",
        description: "A mystery thriller that follows symbologist Robert Langdon as he investigates a murder in the Louvre."
      },
      {
        title: "The Alchemist",
        author: "Paulo Coelho",
        genre: "Fiction",
        publishedDate: new Date("1988-05-01").setFullYear(1988),
        price: 12.49,
        imageUrl: "https://picsum.photos/seed/alchemist/200/300.jpg",
        description: "A philosophical story about Santiago's journey to find treasure in the Egyptian pyramids."
      },
      {
        title: "Brave New World",
        author: "Aldous Huxley",
        genre: "Science Fiction",
        publishedDate: new Date("1932-08-15").setFullYear(1932),
        price: 13.99,
        imageUrl: "https://picsum.photos/seed/brave-new-world/200/300.jpg",
        description: "A dystopian novel that explores a futuristic society driven by technological advancements and social conditioning."
      }
    ];

    // Insert sample books
    const insertedBooks = await Book.insertMany(sampleBooks);
    console.log(`Successfully seeded ${insertedBooks.length} books`);
    
    return insertedBooks;
  } catch (error) {
    console.error("Error seeding books:", error);
    throw error;
  }
};

export default seedBooks;