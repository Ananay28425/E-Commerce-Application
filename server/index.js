import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import bookRoutes from './routes/bookRoutes.js';
import authRoutes from './routes/authRoutes.js';

// Configure ES modules path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.use('/book', bookRoutes);
app.use('/auth', authRoutes);

// Main landing page route
app.get('/', (req, res) => {
    res.redirect('/book/landing');
});

// API endpoint
app.get('/api', (req, res) => {
    res.json({ message: 'BookStore API is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

// Database connection and server start
mongoose.connect(process.env.MONGODB_URI)
.then(() => {
    console.log('Connected to MongoDB');
    app.listen(process.env.PORT, () => {
        console.log(`Server is running on http://localhost:${process.env.PORT}`);
        console.log('BookStore E-commerce Application Started Successfully!');
    });
})
.catch((err) => {
    console.error('Database connection error:', err.message);
    process.exit(1);
});

