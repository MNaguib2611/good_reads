const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const book = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required!'],
        unique: true,
        trim: true
    },
    description: {
        type: String,
        default: null,
        trim: true
    },
    image: {
        type: String,
        default: null
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'Category is required!'],
        ref: 'Category'
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'Author is required!'],
        ref: 'Author'
    }
}, 
{
    timestamps: true
});

const Book = mongoose.model('Book', book);

module.exports = Book;