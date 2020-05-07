"use strict";
const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    name: {
        type: String,
        trim:true,
        required:[true,"name is required"]
    },
    description: {
        type: String,
        trim:true,
        required:[true,"description is required"]
    },
    image: {
        type:String,
    },
    category:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required:[true,"Category is required"]
    },
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author',
        required:[true,"Author is required"]
    }
}, {
    timestamps: true
});




const Book = mongoose.model('Book', bookSchema)

module.exports = Book