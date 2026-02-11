import Joi from 'joi';

// Book validation schema
export const bookSchema = Joi.object({
    title: Joi.string().min(3).required().messages({
        'string.empty': 'Title is required',
        'string.min': 'Title must be at least 3 characters long',
        'any.required': 'Title is required'
    }),
    author: Joi.string().min(3).required().messages({
        'string.empty': 'Author is required',
        'string.min': 'Author must be at least 3 characters long',
        'any.required': 'Author is required'
    }),
    genre: Joi.string().required().messages({
        'string.empty': 'Genre is required',
        'any.required': 'Genre is required'
    }),
    publishedDate: Joi.date().max('now').required().messages({
        'date.max': 'Published date cannot be in the future',
        'any.required': 'Published date is required'
    }),
    price: Joi.number().min(0).required().messages({
        'number.min': 'Price cannot be negative',
        'any.required': 'Price is required'
    }),
    imageUrl: Joi.string().uri().optional().allow('').messages({
        'string.uri': 'Image URL must be a valid URL'
    }),
    description: Joi.string().max(500).optional().allow('').messages({
        'string.max': 'Description cannot exceed 500 characters'
    })
}).unknown(false);

// Review validation schema
export const reviewSchema = Joi.object({
    rating: Joi.number().integer().min(1).max(5).required().messages({
        'number.min': 'Rating must be at least 1',
        'number.max': 'Rating cannot be more than 5',
        'any.required': 'Rating is required'
    }),
    comment: Joi.string().min(5).max(500).required().messages({
        'string.empty': 'Comment is required',
        'string.min': 'Comment must be at least 5 characters long',
        'string.max': 'Comment cannot exceed 500 characters',
        'any.required': 'Comment is required'
    })
}).unknown(false);
