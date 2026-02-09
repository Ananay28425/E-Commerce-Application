import Book from "../models/bookModel.js";
import mongoose from "mongoose";
import seedBooks from "./seedBooks.js";
import seedSimpleBooks from "./seedSimpleBooks.js";

export const getAllBooks = async (req,res)=>{
    try{
        const page  = req.query.page || 1;
        const limit = req.query.limit || 3;

        const skip = (page-1)*limit;

        const books = await Book.find().skip(skip).limit(limit);
        const totalBooks = await Book.countDocuments();
        const totalPages = totalBooks/limit;
        res.status(200).json({
            books,
            pagination:{
                currPage: page,
                totalBooks: totalBooks,
                totalPages: totalPages
            }});
    }
    catch(err){
        res.status(400).json({message:'Books Couldnot be Fetched',error:err.message});
    }
}

export const addBook = async(req,res)=>{
    try{
        const {title,author,publishedDate,genre,price,imageUrl,description} = req.body;

        const newBook = new Book({
            title,
            author,
            genre,
            publishedDate,
            price,
            imageUrl: imageUrl || `https://picsum.photos/seed/${title.replace(/\s+/g, '-').toLowerCase()}/200/300.jpg`,
            description
        });

        await newBook.save();
        res.status(200).json({message:"Book added successfully", book: newBook});
    }
    catch(err){
        res.status(400).json({message: "Error in saving the book", err: err.message});
    }

}

export const getBookByID = async (req, res) => {
    try {
      const { id } = req.params;
  
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid book ID' });
      }

      const book = await Book.findById(id);
  
      if (!book) {
        return res.status(404).json({ message: 'Book not found' });
      }
  
      res.status(200).json(book);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching book', error: error.message });
    }
}

export const updateBookByID = async (req,res)=>{
    try{
        const{id}=req.params;
        const updatedBookData = req.body;

        if(!mongoose.Types.ObjectId.isValid(id))
        {
            return res.status(400).json({error:'Book Id is not valid'});
        }

        const updatedBook = await Book.findByIdAndUpdate(id,updatedBookData,{new:true});

        if(!updatedBook)return res.status(404).json({error:'Book not Found !!'});

        res.status(200).json({updatedBook});
    }
    catch(err){
        res.status(400).json({message:'Error updating the book',error:err.message});
  }
}

// Landing page controller
export const showLandingPage = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 6;

        const skip = (page - 1) * limit;

        const books = await Book.find().skip(skip).limit(limit);
        const totalBooks = await Book.countDocuments();
        const totalPages = Math.ceil(totalBooks / limit);

        res.render('landing', {
            books,
            user: req.user,
            pagination: {
                currPage: page,
                totalBooks,
                totalPages
            }
        });
    } catch (error) {
        console.error('Error rendering landing page:', error);
        res.status(500).render('landing', { 
            books: [], 
            user: req.user,
            error: 'Error loading books' 
        });
    }
};

// Seed books controller
export const seedBooksData = async (req, res) => {
    try {
        const seededBooks = await seedSimpleBooks();
        res.status(200).json({ 
            message: "Books seeded successfully", 
            count: seededBooks.length 
        });
    } catch (error) {
        res.status(500).json({ 
            message: "Error seeding books", 
            error: error.message 
        });
    }
};

  export const deleteBook = async (req, res) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id);
    
        if (!book) {
        return res.status(404).json({ message: 'Book not found' });
        }
    
        res.status(200).json({
        message: 'Book deleted successfully',
        deletedBook: book
        });
    } catch (error) {
        res.status(500).json({
        message: 'Error deleting book',
        error: error.message
        });
    }
}