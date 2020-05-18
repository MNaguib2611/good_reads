const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rate = new Schema({
    rating: {
        type: Number,
        required: [true, 'Rating is required!'],
        min: [1, 'Minimum rating is 1'],
        max: [5, 'Maximum rating is 5'],
        default: 1
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        unique: true,
        ref: 'User'
    }
});

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
    avgRate: {
        type: Number,
        default: 0
    },
    popularity: {
        type: Number,
        default: 0
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
    },
    rate: [rate]
},
{
    timestamps: true
});

const Book = mongoose.model('Book', book);

module.exports = Book;