"use strict";

const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        trim: true,
        required: [true,"content is required"]
    },
    user:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User",
        required: [true, "user is required"]
    },
    book: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Book",
        required: [true, "book is required"]
    },
 },
 {
    timestamps: true
 })
 const Comment = mongoose.model('Comment', commentSchema)

module.exports = Comment